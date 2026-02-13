import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { AuthContext } from '../contexts/auth-provider'
import { LoginPage } from '../pages/login'

describe('LoginPage', () => {
	it('should not call login function if form is invalid (empty fields)', async () => {
		const loginMock = vi.fn()

		render(
			<AuthContext.Provider
				value={{
					isAuthenticated: false,
					checkAuth: vi.fn(),
					logout: vi.fn(),
					login: loginMock,
					error: null,
					isLoading: false,
					refreshToken: vi.fn(),
					user: {
						id: 'test',
						username: 'test',
					},
				}}
			>
				<MemoryRouter>
					<LoginPage />
				</MemoryRouter>
			</AuthContext.Provider>,
		)

		const submitButton = screen.getByRole('button', { name: /login/i })
		fireEvent.click(submitButton)

		await waitFor(() => {
			expect(loginMock).not.toHaveBeenCalled()
		})
	})

	it('should call login function with correct data if form is valid', async () => {
		const loginMock = vi.fn()

		render(
			<AuthContext.Provider
				value={{
					isAuthenticated: false,
					checkAuth: vi.fn(),
					logout: vi.fn(),
					login: loginMock,
					error: null,
					isLoading: false,
					refreshToken: vi.fn(),
					user: {
						id: 'test',
						username: 'test',
					},
				}}
			>
				<MemoryRouter>
					<LoginPage />
				</MemoryRouter>
			</AuthContext.Provider>,
		)

		fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'test_user' } })
		fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } })
		fireEvent.click(screen.getByRole('button', { name: /login/i }))

		await waitFor(() => {
			expect(loginMock).toHaveBeenCalledWith('test_user', 'password123')
		})
	})
})
