import type { PortDto, PortSpeed } from '../dtos/port-dto'

export class Port {
	enabled: boolean
	flowControl: boolean
	portNumber: number
	speed: PortSpeed

	constructor({ enabled, flow_control, port_number, speed }: PortDto) {
		this.enabled = enabled
		this.flowControl = flow_control
		this.portNumber = port_number
		this.speed = speed
	}
}
