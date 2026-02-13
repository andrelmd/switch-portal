import type { InternalAxiosRequestConfig } from 'axios'
import { useTokenStore } from '../stores/token-store'

export function addTokenToHeader(config: InternalAxiosRequestConfig) {
	const token = useTokenStore.getState().accessToken
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
}
