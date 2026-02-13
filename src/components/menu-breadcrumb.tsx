import React, { useMemo } from 'react'
import { Link, useLocation } from 'react-router'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from './ui/breadcrumb'

export function MenuBreadcrumb() {
	const location = useLocation()
	const breadcrumbs = useMemo(() => {
		const paths = location.pathname.split('/').filter(Boolean)
		return paths.map((path, index) => {
			const isLast = index === paths.length - 1

			return (
				<React.Fragment key={index}>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link
								data-active={isLast}
								className="data-active:text-accent-foreground"
								to={paths.slice(0, index + 1).join('/')}
							>
								{path}
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					{!isLast && <BreadcrumbSeparator key={`${index}-separator`} />}
				</React.Fragment>
			)
		})
	}, [location.pathname])

	return (
		<Breadcrumb>
			<BreadcrumbList>{breadcrumbs}</BreadcrumbList>
		</Breadcrumb>
	)
}
