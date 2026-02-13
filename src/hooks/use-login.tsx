import { useAuthApi } from './use-auth-api';

export function useLogin() {
	const authApi = useAuthApi()
	return ({ username, password }: { username: string; password: string }) =>
		authApi.post('/api/auth/login', { username, password })
}
