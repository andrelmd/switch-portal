import type { DeviceDto } from '../dtos/device-dto'
import { Port } from './port'

export class Device {
	id: number
	ipAddress: string
	name: string
	ports: Port[]
	constructor({ id, ip_address, name, ports = [] }: DeviceDto) {
		this.id = id
		this.ipAddress = ip_address
		this.name = name
		this.ports = ports.map((port) => new Port(port))
	}
}
