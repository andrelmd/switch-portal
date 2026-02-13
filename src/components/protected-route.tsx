import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../contexts/auth-provider'

export function ProtectedRoute() {
	const { isAuthenticated } = useAuth()

	if (!isAuthenticated) return <Navigate to="/login" replace />

	return <Outlet />
}
