import { useParams } from 'react-router'

export function PortPage() {
	const { id } = useParams()
	return <div>PortPage for {id}</div>
}
