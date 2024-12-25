import type { IPrintParams, IPrintRes, IYMPrintData } from '@/store/interface'
import { getStorage, setStorage, showToast } from '@/utils'

/**
 * 一敏打印
 */
export const useYMPrintStore = defineStore('YMPrint', {
  state: () => ({
    printModule: null,
    printDeviceList: [] as IYMPrintData[],
    ifPrintConnected: false,
    connectedDeviceName: '',
    connectedDeviceData: {} as IYMPrintData,
    printData: [] as IPrintParams[] | null,
  }),
  actions: {
    /**
     * 初始化打印模块, 获取打印设备
     */
    initPrintModule() {
      this.printModule = uni.requireNativePlugin('anxuan_yimin_MPrintModule')
      this.getPrintDeviceList()
    },
    /**
     * 获取打印设备列表
     */
    getPrintDeviceList() {
      this.printModule.devList((res: IPrintRes) => {
        this.printDeviceList = res.data
        const printDevice = getStorage('ymPrintDevice')
        if (printDevice)
          this.connectPrintDevice(printDevice)
      })
    },
    /**
     * 连接打印设备
     */
    connectPrintDevice(deviceName: string) {
      if (deviceName) {
        const findIndex = this.printDeviceList.findIndex(item => item.deviceName === deviceName)
        if (findIndex > -1) {
          this.printModule.connect({
            productId: this.printDeviceList[findIndex].productId,
            vendorId: this.printDeviceList[findIndex].vendorId,
          }, (res: IPrintRes) => {
            if (res.resultCode === 'success') {
              this.connectedDeviceName = deviceName
              this.connectedDeviceData = this.printDeviceList[findIndex]
              this.ifPrintConnected = true
              setStorage('ymPrintDevice', this.connectedDeviceName)
              !this.ifPrintConnected && showToast({ title: '设备连接成功', icon: 'success' })
            }
            if (res.resultCode === 'error') {
              this.connectedDeviceName = ''
              this.connectedDeviceData = {}
              this.ifPrintConnected = false
              setStorage('ymPrintDevice', '')
              showToast({ title: '设备连接失败', icon: 'error' })
            }
          })
        }
      }
      else {
        showToast({ title: '请选择打印设备' })
      }
    },
    /**
     * USB驱动检测
     */
    usbDriverCheck(productId: number, vendorId: number) {
      const usbDriverStatus = this.printModule.usbDriverCheck(productId, vendorId)
      console.log('usb驱动检测情况 => ', usbDriverStatus)
    },
    /**
     * 打印
     */
    print(printData: IPrintParams[]) {
      if (this.ifPrintConnected && this.printModule && printData.length) {
        this.printData = printData
        this.printModule.print(printData.concat([
          {
            printType: 'PAPERFEED',
            msg: '走纸',
          },
          {
            printType: 'PAPERFEED',
            msg: '走纸',
          },
        ]), (res, err) => {
          console.log('打印结果 => ', res, err)
        })
      }
    },
  },
})
