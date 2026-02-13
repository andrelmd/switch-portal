import type { AxiosInstance } from 'axios'
import { createContext, useContext } from 'react'
import { useTokenStore } from '../stores/token-store'

export const AxiosApis = {
	LOGIN: 'login',
} as const

type AxiosApis = (typeof AxiosApis)[keyof typeof AxiosApis]

interface IAxiosContextData {
	instances: Record<AxiosApis, AxiosInstance>
}

const AxiosContext = createContext<IAxiosContextData>({} as IAxiosContextData)

interface IAxiosProviderProps {
	children: React.ReactNode
	instances: Record<AxiosApis, AxiosInstance>
}

export const AxiosProvider = ({ children, instances }: IAxiosProviderProps) => {


	for (const key in instances) {
		instances[key as keyof typeof instances].interceptors.request.use((config) => {
			const token = useTokenStore.getState().accessToken
			if (token) {
				config.headers.Authorization = `Bearer ${token}`
			}

			return config
		})
		instances[key as keyof typeof instances].interceptors.response.use((value) => value, (error) => {
			const removeAccessToken = useTokenStore.getState().removeAccessToken

			if (error.response?.status === 401) {
				removeAccessToken()
			}
			return Promise.reject(error)
		})
	}

	return <AxiosContext.Provider value={{ instances }}>{children}</AxiosContext.Provider>
}

export const useAxios = (name: AxiosApis) => {
	const { instances } = useContext(AxiosContext)

	if (!instances || !instances[name]) {
		throw new Error(`Axios instance with name "${name}" not found.`)
	}

	return instances[name]
}
