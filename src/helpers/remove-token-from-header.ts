import { HttpStatusCode } from 'axios'
import { useTokenStore } from '../stores/token-store'

export function removeTokenFromHeader(error: any) {
	const removeAccessToken = useTokenStore.getState().removeAccessToken

	if (error.response?.status === HttpStatusCode.Unauthorized) {
		removeAccessToken()
	}
	return Promise.reject(error)
}
