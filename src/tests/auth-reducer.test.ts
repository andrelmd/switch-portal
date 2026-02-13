import { describe, expect, it } from 'vitest'
import { type AuthAction, authReducer, type AuthState } from '../contexts/auth-provider'

describe('authReducer', () => {
	const initialState: AuthState = {
		user: null,
		isLoading: false,
		error: null,
	}

	const user = { id: '1', username: 'test-user' }

	it('should handle LOGIN_START', () => {
		const action: AuthAction = { type: 'LOGIN_START' }
		const newState = authReducer(initialState, action)
		expect(newState).toEqual({ ...initialState, isLoading: true, error: null })
	})

	it('should handle LOGIN_SUCCESS', () => {
		const action: AuthAction = { type: 'LOGIN_SUCCESS', payload: user }
		const newState = authReducer({ ...initialState, isLoading: true }, action)
		expect(newState).toEqual({ ...initialState, isLoading: false, user })
	})

	it('should handle LOGIN_ERROR', () => {
		const error = 'Invalid credentials'
		const action: AuthAction = { type: 'LOGIN_ERROR', payload: error }
		const newState = authReducer({ ...initialState, isLoading: true }, action)
		expect(newState).toEqual({ ...initialState, isLoading: false, error })
	})

	it('should handle LOGOUT', () => {
		const loggedState: AuthState = { ...initialState, user }
		const action: AuthAction = { type: 'LOGOUT' }
		const newState = authReducer(loggedState, action)
		expect(newState).toEqual({ ...initialState, user: null })
	})

	it('should handle CHECK_AUTH_START', () => {
		const action: AuthAction = { type: 'CHECK_AUTH_START' }
		const newState = authReducer(initialState, action)
		expect(newState).toEqual({ ...initialState, isLoading: true })
	})

	it('should handle CHECK_AUTH_SUCCESS', () => {
		const action: AuthAction = { type: 'CHECK_AUTH_SUCCESS', payload: user }
		const newState = authReducer({ ...initialState, isLoading: true }, action)
		expect(newState).toEqual({ ...initialState, isLoading: false, user })
	})

	it('should handle CHECK_AUTH_ERROR', () => {
		const loggedState: AuthState = { ...initialState, user, isLoading: true }
		const action: AuthAction = { type: 'CHECK_AUTH_ERROR' }
		const newState = authReducer(loggedState, action)
		expect(newState).toEqual({ ...initialState, isLoading: false, user: null })
	})

	it('should handle TOKEN_REFRESH_START', () => {
		const action: AuthAction = { type: 'TOKEN_REFRESH_START' }
		const newState = authReducer(initialState, action)
		expect(newState).toEqual({ ...initialState, isLoading: true })
	})

	it('should handle TOKEN_REFRESH_SUCCESS', () => {
		const action: AuthAction = { type: 'TOKEN_REFRESH_SUCCESS', payload: user }
		const newState = authReducer({ ...initialState, isLoading: true }, action)
		expect(newState).toEqual({ ...initialState, isLoading: false, user })
	})

	it('should handle TOKEN_REFRESH_ERROR', () => {
		const loggedState: AuthState = { ...initialState, user }
		const action: AuthAction = { type: 'TOKEN_REFRESH_ERROR' }
		const newState = authReducer(loggedState, action)
		expect(newState).toEqual({ ...initialState, user: null })
	})

	it('should return current state for unknown action', () => {
		const action = { type: 'UNKNOWN' }
		const newState = authReducer(initialState, action as AuthAction)
		expect(newState).toBe(initialState)
	})
})
