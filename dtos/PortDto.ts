export class PortDto {
  deviceId: number
  number: number
  statusId: number
  speedId: number
  flowControlId: number

  constructor(
    switchId: number,
    number: number,
    statusId: number,
    speedId: number,
    flowControlId: number,
  ) {
    this.deviceId = switchId
    this.number = number
    this.statusId = statusId
    this.speedId = speedId
    this.flowControlId = flowControlId
  }
}
