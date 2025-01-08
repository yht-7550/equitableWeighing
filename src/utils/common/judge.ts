export const isObject = (val: unknown): val is Record<any, any> => {
  return val !== null && typeof val === 'object' && Array.isArray(val) === false
}
