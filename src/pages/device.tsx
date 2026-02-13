import { PlusIcon } from 'lucide-react'
import { DevicesTable } from '../components/devices-table'
import { Button } from '../components/ui/button'
import { Stack } from '../components/ui/stack'

export function DevicePage() {
	return (
		<Stack className="items-center justify-center h-screen p-4">
			<div className="flex justify-end w-full p-2">
				<Button>
					<PlusIcon /> Add device
				</Button>
			</div>
			<div className="flex-1 w-full p-2 shadow-md">
				<DevicesTable />
			</div>
		</Stack>
	)
}
