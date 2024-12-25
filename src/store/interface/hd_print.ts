export interface IHDPrintData {
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

interface DeviceList {
  [key: string]: IHDPrintData
}

export interface IHDPrintDevRes {
  deviceList: DeviceList
}

export interface IHDPrintConnectRes {
  resultCode: 'success' | 'error'
  isConnected: boolean
}

export interface IHDPrintParamsBase {
  /**
   * 打印类型 BARCODE: 条码 QRCODE: 二维码 TEXT: 文本 TABLE: 表格 FEEDLINE: 走纸
   */
  type: 'BARCODE' | 'QRCODE' | 'TEXT' | 'TABLE' | 'FEEDLINE'
  /**
   * 文本、表格内容(用逗号 , 分割字段)
   */
  msg: string
  /**
   * 字体大小 default: 0
   */
  width?: 0 | 1
  /**
   * 字体高度 default: 0
   */
  height?: 0 | 1
  /**
   * 0: 左对齐 1: 居中 2: 右对齐 default: 0
   */
  position?: 0 | 1 | 2
  /**
   * 字体加粗
   */
  bold?: boolean
  qrlevel?: number
  nVersion?: number
}
