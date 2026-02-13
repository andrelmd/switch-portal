import { RouterIcon } from 'lucide-react'
import type { Device } from '../classes/device'
import { PortStatusBadge } from './port-status-badge'
import { DeviceStatusBadge } from './ui/device-status-badge'
import { Stack } from './ui/stack'

interface IDeviceCardProps {
	device: Device
}

export function DeviceCard({ device }: IDeviceCardProps) {
	const { ipAddress, name, ports } = device
	return (
		<Stack className="bg-card text-card-foreground p-4 rounded-xl">
			<Stack orientation={'horizontal'} className="items-center gap-4">
				<Stack className="items-center gap-2">
					<RouterIcon className="text-destructive" />
					<DeviceStatusBadge statusId={1} />
				</Stack>
				<Stack>
					<span className="text-lg font-bold text-foreground text-nowrap text-ellipsis overflow-hidden">
						{name}
					</span>
					<a
						href={`http://${ipAddress}`}
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm text-muted-foreground"
					>
						{ipAddress}
					</a>
				</Stack>

				<div className="grid grid-cols-3 gap-2">
					{ports.map(({ enabled, flowControl, portNumber, speed }) => (
						<PortStatusBadge
							key={portNumber}
							portNumber={portNumber}
							enabled={enabled}
							flowControl={flowControl}
							speed={speed}
						/>
					))}
				</div>
			</Stack>
		</Stack>
	)
}
