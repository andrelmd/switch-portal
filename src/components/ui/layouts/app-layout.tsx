import { Outlet } from 'react-router'
import { ThemeProvider } from '../../../contexts/theme-provider'

export function AppLayout() {
	return (
		<div className="w-dvw h-dvh flex">
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<Outlet />
			</ThemeProvider>
		</div>
	)
}
