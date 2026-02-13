import type { PortDto } from './port-dto'

export const DeviceStatus = {
	ONLINE: 0,
	OFFLINE: 1,
	REBOOTING: 2,
} as const

export type DeviceStatus = (typeof DeviceStatus)[keyof typeof DeviceStatus]

export interface DeviceDto extends DeviceBaseDto {
	id: number
	ports: PortDto[]
}

export interface DeviceBaseDto {
	name: string
	ip_address: string
}

export interface CreateDeviceDto extends DeviceBaseDto {
	username: string
	password: string
}

export interface UpdateDeviceDto extends Partial<CreateDeviceDto> {}
