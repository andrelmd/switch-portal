export const PortStatus = {
	DOWN: 0,
	UP: 1,
} as const

export type PortStatus = (typeof PortStatus)[keyof typeof PortStatus]

export const PortSpeed = {
	AUTO: 1,
	'10MH': 2,
	'10MF': 3,
	'100MH': 4,
	'100MF': 5,
	'1000MF': 6,
}

export type PortSpeed = (typeof PortSpeed)[keyof typeof PortSpeed]

export interface PortDto {
	port_number: number
	enabled: boolean
	speed: PortSpeed
	flow_control: boolean
}
