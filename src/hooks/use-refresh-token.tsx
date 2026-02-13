import { useAuthApi } from './use-auth-api'

export function useRefreshToken() {
	const authApi = useAuthApi()
	return () => authApi.post('/api/auth/refresh')
}

