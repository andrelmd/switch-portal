import { Moon, Sun } from 'lucide-react'
import { useMemo } from 'react'
import { useTheme } from '../../contexts/theme-provider'
import { MenuBreadcrumb } from '../menu-breadcrumb'
import { Button } from './button'
import { Separator } from './separator'
import { SidebarTrigger } from './sidebar'

export function Header() {
	const { theme, systemTheme, setTheme } = useTheme()
	const buttonIcon = useMemo(() => {
		if (theme === 'system') {
			return systemTheme === 'dark' ? <Sun /> : <Moon />
		}

		return theme === 'dark' ? <Sun /> : <Moon />
	}, [theme])

	const handleOnClick = () => {
		if (theme === 'system') {
			return setTheme(systemTheme === 'dark' ? 'light' : 'dark')
		}

		return setTheme(theme === 'dark' ? 'light' : 'dark')
	}
	return (
		<header>
			<div className="w-full flex flex-row items-center justify-between p-2 bg-sidebar text-sidebar-accent-foreground">
				<div className="flex flex-row items-center gap-2">
					<SidebarTrigger />
					<Separator orientation="vertical" />
					<MenuBreadcrumb />
				</div>
				<Button variant={'outline'} size={'icon-sm'} onClick={handleOnClick}>
					{buttonIcon}
				</Button>
			</div>
		</header>
	)
}
