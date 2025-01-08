import { getServiceEnvConfig } from '@/config'
import { erpTokenRequestInterceptor, statusResponseInterceptor } from './interceptors'
import { createRequest } from './request'

const { baseUrl } = getServiceEnvConfig(import.meta.env)

export const useHttp = createRequest({
  baseURL: baseUrl,
  returnData(val) {
    return val.data
  },
}, {
  requestInterceptors: [
    erpTokenRequestInterceptor,
  ],
  responseInterceptors: [
    statusResponseInterceptor,
  ],
})
