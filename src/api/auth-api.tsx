import axios from 'axios'
import { addTokenToHeader } from '../helpers/add-token-to-header'
import { removeTokenFromHeader } from '../helpers/remove-token-from-header'

export const authApi = axios.create({
	baseURL: 'http://localhost:8000/api/auth/v1',
	withCredentials: true,
})

authApi.interceptors.request.use(addTokenToHeader)
authApi.interceptors.response.use((response) => response, removeTokenFromHeader)
