import { Outlet } from 'react-router'
import { AppSidebar } from '../app-sidebar'
import { Header } from '../header'
import { SidebarProvider } from '../sidebar'

export function LoggedLayout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<div className="flex flex-1 flex-col">
				<Header />
				<Outlet />
			</div>
		</SidebarProvider>
	)
}
