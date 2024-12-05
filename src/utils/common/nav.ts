const params2Url = (params: Record<string, any>) => {
  return Object.keys(params)
    .map((key) => {
      return `${key}=${params[key]}`
    })
    .join('&')
}

/**
 * 保留当前页面，跳转到应用内的某个页面
 * @param options UniApp.NavigateToOptions
 * @param params 跳转携带的参数
 */
export const to = (options: UniApp.NavigateToOptions, params?: Record<string, any>) => {
  let { url } = options
  if (params) {
    url = `${url}?${params2Url(params)}`
  }
  uni.navigateTo({
    url,
  })
}
