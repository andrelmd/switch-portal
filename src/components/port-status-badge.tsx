import { ArrowDownUpIcon, PowerIcon, PowerOff } from 'lucide-react'
import { PortSpeed } from '../dtos/port-dto'
import { Badge } from './ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

interface IPortStatusBadgeProps {
	portNumber: number
	enabled: boolean
	flowControl: boolean
	speed: number
}

export function PortStatusBadge({ portNumber, enabled, flowControl, speed }: IPortStatusBadgeProps) {
	const enabledIcon = enabled ? (
		<PowerIcon className="text-primary  w-3.5 h-3.5" />
	) : (
		<PowerOff className="text-destructive  w-3.5 h-3.5" />
	)
	const flowControlIcon = flowControl ? (
		<ArrowDownUpIcon className="text-primary w-3.5 h-3.5" />
	) : (
		<ArrowDownUpIcon className="text-destructive  w-3.5 h-3.5" />
	)

	const portSpeedDescription = Object.entries(PortSpeed).find(([_, value]) => value === speed)?.[0]

	return (
		<Badge variant={'outline'} className="w-full gap-1 flex items-center justify-between">
			{portNumber}
			<Tooltip>
				<TooltipTrigger asChild>
					<div>{enabledIcon}</div>
				</TooltipTrigger>
				<TooltipContent>
					<p>{enabled ? 'Port Enabled' : 'Port Disabled'}</p>
				</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<div>{flowControlIcon}</div>
				</TooltipTrigger>
				<TooltipContent>
					<p>{flowControl ? 'Flow Control Enabled' : 'Flow Control Disabled'}</p>
				</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger>{portSpeedDescription}</TooltipTrigger>
				<TooltipContent>
					<p>Port Speed</p>
				</TooltipContent>
			</Tooltip>
		</Badge>
	)
}
