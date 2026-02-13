import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Landing } from './components/lading'
import { ProtectedRoute } from './components/protected-route'
import { AppLayout } from './components/ui/layouts/app-layout'
import { LoggedLayout } from './components/ui/layouts/logged-layout'
import { TooltipProvider } from './components/ui/tooltip'
import { AuthProvider, useAuth } from './contexts/auth-provider'
import { DevicePage } from './pages/device'
import { LoadingPage } from './pages/loading'
import { LoginPage } from './pages/login'
import { NotFoundPage } from './pages/not-found'
import { PortPage } from './pages/port'

const queryClient = new QueryClient()

export function AppContent() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AppLayout />}>
					<Route path="/" element={<Landing />} />
					<Route path="login" element={<LoginPage />} />
					<Route element={<ProtectedRoute />}>
						<Route element={<LoggedLayout />}>
							<Route path="devices" element={<DevicePage />} />
							<Route path="devices/:id" element={<PortPage />} />
						</Route>
					</Route>
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
export function App() {
	const { isLoading, isAuthenticated } = useAuth()

	if (isLoading && !isAuthenticated) return <LoadingPage />

	return <AppContent />
}

export default function Root() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<TooltipProvider>
					<App />
				</TooltipProvider>
			</AuthProvider>
		</QueryClientProvider>
	)
}
