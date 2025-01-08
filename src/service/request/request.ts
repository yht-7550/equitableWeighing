import { ContentTypeEnum, ResultEnum } from '@/enums/httpEnum'
import { hideLoading, showErrorModal, showLoading, showToast } from '@/utils'
import { getErrorMsg } from '@/utils/common/error'

let loadingCount = 0

export const createRequest = (baseRequestConfig: RequestConfig, interceptorConfig?: InterceptorConfig) => {
  const request = <T>(requestConfig: RequestConfig) => {
    // 合并请求配置
    requestConfig = {
      ...baseRequestConfig,
      ...requestConfig,
    }

    const { requestInterceptors, responseInterceptors } = interceptorConfig

    // 请求拦截器
    if (requestInterceptors) {
      for (const interceptor of requestInterceptors) {
        requestConfig = interceptor(requestConfig)
      }
    }

    const {
      baseURL = '',
      method = 'POST',
      url,
      data,
      header,
      loading = false,
      timeout = ResultEnum.TIMEOUT,
      errMsg = '',
      deSerialize = true,
      showErr = true,
      returnData = val => val.data,
    } = requestConfig

    if (loading) {
      loadingCount++
      showLoading('加载中...')
    }

    if (deSerialize) {
      header.content_type = ContentTypeEnum.FORM_URLENCODED
    }

    return new Promise((resolve, reject) => {
      const requestTask = uni.request({
        url: url?.startsWith('/') ? `${baseURL}${url}` : url as string,
        method,
        header,
        timeout,
        data,
        success(result) {
          try {
            // 响应拦截器
            for (const interceptor of responseInterceptors) {
              result = interceptor(result)
            }
          }
          catch (error) {
            // 自定义错误优先
            const msg: string = errMsg || getErrorMsg(error)
            console.log(`捕获到请求异常来自: ${url} - 异常消息：${msg}`)
            if (showErr) {
              showToast({
                title: msg,
                duration: 2000,
              })
            }

            reject(msg)
            return
          }

          // 自定义返回数据
          resolve(returnData(result) as T)
        },
        fail(err) {
          const _errMsg = getErrorMsg(err)
          if (_errMsg) {
            const msg = `${_errMsg}`
            showErrorModal(msg)
            reject(msg)
          }
          reject(err)
        },
        complete() {
          if (loadingCount !== 0) {
            --loadingCount === 0 && hideLoading()
          }
        },
      })
      uni.getNetworkType({
        success(res) {
          if (res.networkType === 'none') {
            showToast({
              title: '网络异常',
              icon: 'error',
              mask: true,
              duration: 2000,
            })
            // 取消请求
            requestTask.abort()
            reject(new Error('网络异常'))
          }
        },
      })
    })
  }

  /**
   * GET请求
   */
  const get = <T>(requestConfig: RequestConfig) => {
    return request<T>({ ...requestConfig, method: 'GET' })
  }
  /**
   * POST请求
   */
  const post = <T>(requestConfig: RequestConfig) => {
    return request<T>({ ...requestConfig, method: 'POST' })
  }
  /**
   * PUT请求
   */
  const put = <T>(requestConfig: RequestConfig) => {
    return request<T>({ ...requestConfig, method: 'PUT' })
  }
  /**
   * DELETE请求
   */
  const del = <T>(requestConfig: RequestConfig) => {
    return request<T>({ ...requestConfig, method: 'DELETE' })
  }

  return {
    get,
    post,
    put,
    del,
  }
}
