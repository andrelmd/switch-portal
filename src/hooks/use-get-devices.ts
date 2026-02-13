import { useQuery } from '@tanstack/react-query'
import { deviceApi } from '../api/device-api'
import { Device } from '../classes/device'
import { QueryKeys } from '../constants/query-keys'
import type { DeviceDto } from '../dtos/device-dto'
import type { PortDto } from '../dtos/port-dto'

export function useGetDevices() {
	return useQuery({
		queryKey: [QueryKeys.DEVICES],
		queryFn: async () => {
			const response = await deviceApi.get('')
			return Array.from(
				{ length: 1 },
				(_, i) =>
					new Device({
						id: i,
						ip_address: `192.168.1.${i}`,
						name: `Device ${i}`,
						ports: Array.from({ length: 8 }, (_, j) => {
							return {
								enabled: Math.random() > 0.5,
								flow_control: Math.random() > 0.5,
								port_number: j,
								speed: Math.floor(Math.random() * 6) + 1,
							} as PortDto
						}),
					}),
			)
			return response?.data.map((device: DeviceDto) => new Device(device)) as Array<Device>
		},
	})
}
