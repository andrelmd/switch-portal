import { PortDto } from './PortDto'

export class DeviceDto {
  id?: number
  ipAddress: string
  username?: string
  password?: string
  createdAt?: Date
  updatedAt?: Date
  ports?: Array<PortDto>

  private constructor({
    id,
    ipAddress,
    username,
    password,
    createdAt,
    updatedAt,
    ports,
  }: {
    id?: number
    ipAddress: string
    username?: string
    password?: string
    createdAt?: Date
    updatedAt?: Date
    ports?: Array<PortDto>
  }) {
    this.id = id
    this.ipAddress = ipAddress
    this.username = username
    this.password = password
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.ports = ports
  }

  static fromRawDeviceDto(rawDeviceDto: DeviceDto) {
    const createdAt = rawDeviceDto.createdAt
      ? new Date(rawDeviceDto.createdAt)
      : new Date()
    const updatedAt = rawDeviceDto.updatedAt
      ? new Date(rawDeviceDto.updatedAt)
      : new Date()
    return new DeviceDto({
      id: rawDeviceDto.id,
      ipAddress: rawDeviceDto.ipAddress,
      createdAt,
      updatedAt,
      ports: rawDeviceDto.ports?.map(
        (it) =>
          new PortDto(
            it.deviceId,
            it.number,
            it.statusId,
            it.speedId,
            it.flowControlId,
          ),
      ),
    })
  }

  static create(ipAddress: string, username: string, password: string) {
    return new DeviceDto({ ipAddress, username, password })
  }
}
