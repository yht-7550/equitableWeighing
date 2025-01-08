export * from './env'
export * from './error'
export * from './modal'
export * from './nav'
export * from './storage'

/**
 * 对象中的键值为undefined/null删除
 * @param obj 要处理的对象
 * @returns 处理后的对象
 */
export const deleteUndefined: any = (obj: any) => {
  for (const key in obj) {
    if (obj[key] === undefined || obj[key] === null) {
      delete obj[key]
    }
  }
  return obj
}

/**
 * 提取URL的参数
 * @param urlParamsStr URL的参数(包含?开头的)
 * @returns URL参数对象
 */
export const getUrlParams = (urlParamsStr: string) => {
  return Array.from(new URLSearchParams(urlParamsStr)).reduce(
    (p, [k, v]) => (
      Object.assign({}, p, {
        [k]: p[k] ? (Array.isArray(p[k]) ? p[k] : [p[k]]).concat(v) : v,
      })
    ),
    {},
  ) as anyObj
}
