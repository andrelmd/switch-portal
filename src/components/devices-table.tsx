import { useGetDevices } from '../hooks/use-get-devices'
import { DeviceCard } from './device-card'

export function DevicesTable() {
	const { data, isLoading } = useGetDevices()

	if (isLoading) return null
	if (!data) return null

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{data.map((device) => (
				<DeviceCard key={device.id} device={device} />
			))}
		</div>
	)
}
