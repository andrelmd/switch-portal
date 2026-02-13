import { Navigate } from 'react-router'
import { useAuth } from '../contexts/auth-provider'

export function Landing() {
	const { isAuthenticated } = useAuth()
	return isAuthenticated ? <Navigate to="/devices" replace /> : <Navigate to="/login" replace />
}
