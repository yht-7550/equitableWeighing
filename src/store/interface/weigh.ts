export interface IWeighBase {
  resultCode: 'success' | 'error'
  msg: string
}

export type IWeighDeviceRes = IWeighBase & {
  data: string[]
}

export interface IWeighData {
  canSale: boolean
  filterAD: number
  grossWeight: number
  iDecimal: number
  iMode: number
  iUnitId: number
  isOverWeight: boolean
  isPreTare: boolean
  isStable: boolean
  isTare: boolean
  isUnderWeight: boolean
  isZero: boolean
  isZeroMode: boolean
  netWeight: number
  originAD: number
  tareWeight: number
  unit: string
  weightAD: number
  zeroAD: number
}

export type IWeighConnectRes = IWeighBase & {
  data: string
}
