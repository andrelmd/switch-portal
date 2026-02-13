import axios from 'axios'
import { addTokenToHeader } from '../helpers/add-token-to-header'
import { removeTokenFromHeader } from '../helpers/remove-token-from-header'

export const deviceApi = axios.create({
	baseURL: 'http://localhost:8000/api/devices/v1',
	withCredentials: true,
})

deviceApi.interceptors.request.use(addTokenToHeader)
deviceApi.interceptors.response.use((response) => response, removeTokenFromHeader)
