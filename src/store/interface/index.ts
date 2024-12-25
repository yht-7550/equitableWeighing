export * from './common'
export * from './hd_print'
export * from './weigh'
export * from './ym_print'

export interface IPrintDeviceData {
  deviceProtocol: number
  deviceName: string
  interfaceCount: number
  deviceClass: number
  deviceSubclass: number
  productId: number
  deviceId: number
  configurationCount: number
  productName: string
  vendorId: number
  version: string
  serialNumber?: string
  manufacturerName: string
}
