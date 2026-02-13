import { render, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { authApi } from '../api/auth-api'
import { AuthProvider } from '../contexts/auth-provider'

// Mock das dependências
vi.mock('../api/auth-api', () => ({
	authApi: {
		get: vi.fn(),
		post: vi.fn(),
	},
}))

vi.mock('../stores/token-store', () => ({
	useTokenStore: () => ({
		setAccessToken: vi.fn(),
		removeAccessToken: vi.fn(),
	}),
}))

describe('AuthProvider', () => {
	it('should call checkAuth on initialization', async () => {
		vi.mocked(authApi.get).mockResolvedValue({
			data: { id: '1', username: 'test-user' },
		})

		render(
			<AuthProvider>
				<div>Test Child</div>
			</AuthProvider>,
		)

		await waitFor(() => {
			expect(authApi.get).toHaveBeenCalledWith('me')
		})
	})
})
