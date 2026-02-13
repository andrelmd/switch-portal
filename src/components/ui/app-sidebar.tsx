import { NavUser } from './nav-user'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from './sidebar'

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarHeader />
			<SidebarContent>
				<SidebarGroup />
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	)
}
