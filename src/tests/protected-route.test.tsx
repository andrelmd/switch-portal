import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { ProtectedRoute } from '../components/protected-route'
import { AuthContext, AuthProvider } from '../contexts/auth-provider'

function renderMock() {
	return render(
		<MemoryRouter initialEntries={['/dashboard']}>
			<Routes>
				<Route path="/login" element={<h1>Login Page</h1>} />
				<Route element={<ProtectedRoute />}>
					<Route path="/dashboard" element={<h1>Protected Dashboard</h1>} />
				</Route>
			</Routes>
		</MemoryRouter>,
		{ wrapper: AuthProvider },
	)
}

describe('ProtectedRoute', () => {
	it('should redirect to login page if user is not authenticated', () => {
		renderMock()

		expect(screen.getByRole('heading', { name: /Login Page/i })).toBeInTheDocument()
		expect(screen.queryByText(/Protected Dashboard/i)).not.toBeInTheDocument()
	})

	it('should render protected content if user is authenticated', () => {
		render(
			<AuthContext.Provider
				value={{
					isAuthenticated: true,
					checkAuth: vi.fn(),
					logout: vi.fn(),
					login: vi.fn(),
					error: null,
					isLoading: false,
					refreshToken: vi.fn(),
					user: {
						id: 'test',
						username: 'test',
					},
				}}
			>
				<MemoryRouter initialEntries={['/dashboard']}>
					<Routes>
						<Route path="/login" element={<h1>Login Page</h1>} />
						<Route element={<ProtectedRoute />}>
							<Route path="/dashboard" element={<h1>Protected Dashboard</h1>} />
						</Route>
					</Routes>
				</MemoryRouter>
			</AuthContext.Provider>,
			{},
		)

		expect(screen.getByRole('heading', { name: /Protected Dashboard/i })).toBeInTheDocument()
	})
})
