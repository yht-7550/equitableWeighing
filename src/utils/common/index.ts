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
