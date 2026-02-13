import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react'
import { authApi } from '../api/auth-api'
import { useTokenStore } from '../stores/token-store'

export interface User {
	id: string
	username: string
}

export interface AuthContextType {
	user: User | null
	isAuthenticated: boolean
	isLoading: boolean
	error: string | null
	login: (email: string, password: string) => Promise<void>
	logout: () => Promise<void>
	checkAuth: () => Promise<void>
	refreshToken: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export type AuthState = {
	user: User | null
	isLoading: boolean
	error: string | null
}

export type AuthAction =
	| { type: 'LOGIN_START' }
	| { type: 'LOGIN_SUCCESS'; payload: User }
	| { type: 'LOGIN_ERROR'; payload: string }
	| { type: 'LOGOUT' }
	| { type: 'CHECK_AUTH_START' }
	| { type: 'CHECK_AUTH_SUCCESS'; payload: User }
	| { type: 'CHECK_AUTH_ERROR' }
	| { type: 'TOKEN_REFRESH_START' }
	| { type: 'TOKEN_REFRESH_SUCCESS'; payload: User }
	| { type: 'TOKEN_REFRESH_ERROR' }

const initialState: AuthState = {
	user: null,
	isLoading: true,
	error: null,
}

export function authReducer(state: AuthState, action: AuthAction): AuthState {
	switch (action.type) {
		case 'LOGIN_START':
			return { ...state, isLoading: true, error: null }
		case 'LOGIN_SUCCESS':
			return { ...state, isLoading: false, user: action.payload }
		case 'LOGIN_ERROR':
			return { ...state, isLoading: false, error: action.payload }
		case 'LOGOUT':
			return { ...state, user: null }
		case 'CHECK_AUTH_START':
			return { ...state, isLoading: true }
		case 'CHECK_AUTH_SUCCESS':
			return { ...state, isLoading: false, user: action.payload }
		case 'CHECK_AUTH_ERROR':
			return { ...state, isLoading: false, user: null }
		case 'TOKEN_REFRESH_START':
			return { ...state, isLoading: true }
		case 'TOKEN_REFRESH_SUCCESS':
			return { ...state, isLoading: false, user: action.payload }
		case 'TOKEN_REFRESH_ERROR':
			return { ...state, user: null }
		default:
			return state
	}
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(authReducer, initialState)
	const tokenStore = useTokenStore()

	useEffect(() => {
		checkAuth()
	}, [])

	const login = useCallback(async (username: string, password: string) => {
		dispatch({ type: 'LOGIN_START' })
		try {
			const authBodyFormData = new FormData()
			authBodyFormData.append('username', username)
			authBodyFormData.append('password', password)

			const response = await authApi.post('login', authBodyFormData)

			const { access_token, user } = response.data

			tokenStore.setAccessToken(access_token)

			dispatch({ type: 'LOGIN_SUCCESS', payload: user })
		} catch (error) {
			dispatch({
				type: 'LOGIN_ERROR',
				payload: error instanceof Error ? error.message : 'Unknown error',
			})
			throw error
		}
	}, [])

	const logout = useCallback(async () => {
		tokenStore.removeAccessToken()
		dispatch({ type: 'LOGOUT' })
	}, [])

	const checkAuth = useCallback(async () => {
		dispatch({ type: 'CHECK_AUTH_START' })
		try {
			const response = await authApi.get('me')

			const user: User = await response.data
			dispatch({ type: 'CHECK_AUTH_SUCCESS', payload: user })
		} catch (error) {
			dispatch({ type: 'CHECK_AUTH_ERROR' })
		}
	}, [])

	const refreshToken = useCallback(async () => {
		dispatch({ type: 'TOKEN_REFRESH_START' })
		try {
			const response = await authApi.post('refresh')
			const { access_token, user } = response.data

			tokenStore.setAccessToken(access_token)

			dispatch({ type: 'TOKEN_REFRESH_SUCCESS', payload: user })
		} catch (error) {
			tokenStore.removeAccessToken()
			dispatch({ type: 'TOKEN_REFRESH_ERROR' })
			throw error
		}
	}, [])

	useEffect(() => {
		const interval = setInterval(
			() => {
				refreshToken()
			},
			1000 * 60 * 15,
		)

		return () => clearInterval(interval)
	}, [])

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				isAuthenticated: state.user !== null,
				isLoading: state.isLoading,
				error: state.error,
				login,
				logout,
				checkAuth,
				refreshToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within AuthProvider')
	}
	return context
}
