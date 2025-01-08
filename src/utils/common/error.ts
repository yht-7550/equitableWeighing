import { ErrTypeMsg } from '@/enums/httpEnum'
import { isObject } from './judge'

/**
 * 获取错误信息
 * @param err - 错误对象
 */
export function getErrorMsg(err: Error | UniApp.GeneralCallbackResult | unknown) {
  if (isObject(err)) {
    // if has msg property, return it
    if (Object.prototype.hasOwnProperty.call(err, 'msg')) {
      return (err as any).msg
    }
    // if has message property, return it
    if (Object.prototype.hasOwnProperty.call(err, 'message')) {
      return (err as any).message
    }
    // if has errMsg property, return it
    if (Object.prototype.hasOwnProperty.call(err, 'errMsg')) {
      return (err as UniApp.GeneralCallbackResult).errMsg
    }

    // unknown error
    return ErrTypeMsg.DEFAULT_REQUEST_ERROR_MSG
  }

  return err
}
