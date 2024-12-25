export interface IYMPrintData {
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

export interface IPrintRes {
  resultCode: 'success' | 'error'
  data: IYMPrintData[]
  msg: string
}

interface IPrintParamsBase {
  /**
   * 打印类型 BARCODE: 条码 QRCODE: 二维码 TEXT: 文本 SEPARATE: 分隔线 PAPERFEED: 走纸
   */
  printType: 'BARCODE' | 'QRCODE' | 'TEXT' | 'SEPARATE' | 'PAPERFEED'
  /**
   * 文本内容
   */
  msg: string
  /**
   * 0: 左对齐 1: 居中 2: 右对齐 default: 0
   */
  alignment?: number
  oldLine?: boolean
  bold?: boolean
  underline?: boolean
  width?: number
  height?: number
  iHrisize?: number
  iHriseat?: number
  iCodetype?: number
  iLmargin?: number
  iMside?: number
}

type IPrintParamsTable = Omit<IPrintParamsBase, 'printType'> & {
  printType: 'TABLE'
  /**
   * 表格内容
   */
  tableList: string[]
  msg?: string
}

export type IPrintParams = IPrintParamsBase | IPrintParamsTable
