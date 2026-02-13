import { AxiosApis, useAxios } from '../contexts/axios-provider'

export function useAuthApi() {
	const authApi = useAxios(AxiosApis.LOGIN)
	return authApi
}
