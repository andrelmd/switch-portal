import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react'
import { useCheckAuth } from '../hooks/use-check-auth'
import { useLogin } from '../hooks/use-login'
import { useRefreshToken } from '../hooks/use-refresh-token'
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

const AuthContext = createContext<AuthContextType | null>(null)

type AuthState = {
	user: User | null
	isLoading: boolean
	error: string | null
}

type AuthAction =
	| { type: 'LOGIN_START' }
	| { type: 'LOGIN_SUCCESS'; payload: User }
	| { type: 'LOGIN_ERROR'; payload: string }
	| { type: 'LOGOUT' }
	| { type: 'CHECK_AUTH_START' }
	| { type: 'CHECK_AUTH_SUCCESS'; payload: User }
	| { type: 'CHECK_AUTH_ERROR' }
	| { type: 'TOKEN_REFRESH_START' }
	| { type: 'TOKEN_REFRESH_SUCCESS' }
	| { type: 'TOKEN_REFRESH_ERROR' }

const initialState: AuthState = {
	user: null,
	isLoading: true,
	error: null,
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
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
			return { ...state, isLoading: false }
		case 'TOKEN_REFRESH_ERROR':
			return { ...state, user: null }
		default:
			return state
	}
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(authReducer, initialState)
	const loginFn = useLogin()
	const refreshTokenFn = useRefreshToken()
	const checkAuthFn = useCheckAuth()
	const tokenStore = useTokenStore()

	useEffect(() => {
		checkAuth()
	}, [])

	const login = useCallback(async (username: string, password: string) => {
		dispatch({ type: 'LOGIN_START' })
		try {
			const response = await loginFn({ username, password })

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
		dispatch({ type: 'LOGOUT' })
	}, [])

	const checkAuth = useCallback(async () => {
		dispatch({ type: 'CHECK_AUTH_START' })
		try {
			const response = await checkAuthFn()

			const user: User = await response.data
			dispatch({ type: 'CHECK_AUTH_SUCCESS', payload: user })
		} catch (error) {
			dispatch({ type: 'CHECK_AUTH_ERROR' })
		}
	}, [])

	const refreshToken = useCallback(async () => {
		dispatch({ type: 'TOKEN_REFRESH_START' })
		try {
			const response = await refreshTokenFn()
			const { access_token } = response.data

			tokenStore.setAccessToken(access_token)

			dispatch({ type: 'TOKEN_REFRESH_SUCCESS' })
		} catch (error) {
			tokenStore.removeAccessToken()
			dispatch({ type: 'TOKEN_REFRESH_ERROR' })
			throw error
		}
	}, [])

	useEffect(() => {
		const interval = setInterval(() => {
			refreshToken()
		}, 1000 * 60 * 15)

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
