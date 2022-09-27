import { PortDto } from './PortDto'

export class DeviceDto {
  id: number
  ipAddress: string
  createdAt: Date
  updatedAt: Date
  ports?: Array<PortDto>

  constructor(rawDeviceDto: DeviceDto) {
    this.id = rawDeviceDto.id
    this.ipAddress = rawDeviceDto.ipAddress
    this.createdAt = rawDeviceDto.createdAt
    this.updatedAt = new Date(rawDeviceDto.updatedAt)
    this.ports = rawDeviceDto.ports
  }
}
