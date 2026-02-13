import { CheckIcon, GlobeXIcon, LoaderIcon } from 'lucide-react'
import { useMemo } from 'react'
import { DeviceStatus } from '../../dtos/device-dto'
import { Badge } from './badge'

interface IDeviceStatusBadgeProps {
	statusId: DeviceStatus
}

export function DeviceStatusBadge({ statusId }: IDeviceStatusBadgeProps) {
	const icon = useMemo(() => {
		switch (statusId) {
			case DeviceStatus.OFFLINE:
				return <GlobeXIcon className="text-destructive" />
			case DeviceStatus.ONLINE:
				return <CheckIcon className="text-primary" />
			case DeviceStatus.REBOOTING:
				return <LoaderIcon className="text-blue-500 animate-[spin_3s_linear_infinite]" />
		}
	}, [statusId])
	const statusDescription = useMemo(() => {
		switch (statusId) {
			case DeviceStatus.OFFLINE:
				return 'Offline'
			case DeviceStatus.ONLINE:
				return 'Online'
			case DeviceStatus.REBOOTING:
				return 'Rebooting'
		}
	}, [statusId])
	return (
		<Badge variant={'outline'}>
			{icon} {statusDescription}
		</Badge>
	)
}
