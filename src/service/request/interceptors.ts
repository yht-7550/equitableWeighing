import { ResultEnum } from '@/enums/httpEnum'
import {
  getStorage,
} from '@/utils'

// 日志请求拦截器
export const logReqInterceptor: requestInterceptor = (requestConfig: RequestConfig) => {
  /* #ifdef APP  */
  console.log(`📄 ${requestConfig.url} RequestConfig`, requestConfig)
  /* #endif */
  return requestConfig
}

// 日志响应拦截器
export const logResInterceptor: responseInterceptor = (result) => {
  /* #ifdef APP  */
  console.log('✨ ResponseResult', result)
  /* #endif */
  return result
}

/**
 * 添加token，请求拦截器
 */
export const erpTokenRequestInterceptor: requestInterceptor = (requestConfig: RequestConfig) => {
  requestConfig.header = {
    ...requestConfig.header,
    token: getStorage('token'),
  }

  return requestConfig
}

/**
 * 状态码响应拦截器
 */
export const statusResponseInterceptor: responseInterceptor = (result) => {
  return result
}

/**
 * 返回值响应拦截器
 */
export const erpResultResponseInterceptor: responseInterceptor = (result) => {
  const resultData = result.data as ResData<any>

  if (resultData.code !== ResultEnum.SUCCESS) {
    if (resultData.code === ResultEnum.OVERDUE) {
      // 登录超时
      console.log('登录超时')
    }
    if (resultData.message) {
      throw new Error(resultData.message)
    }
    else {
      throw new Error('请求失败')
    }
  }
  return result
}
