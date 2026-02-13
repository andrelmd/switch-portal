import { useAuthApi } from './use-auth-api'

export function useCheckAuth() {
	const authApi = useAuthApi()
	return () => authApi.post('/api/auth/me')
}
