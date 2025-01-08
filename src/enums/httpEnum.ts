/**
 * @description：请求配置
 * @param SUCCESS - 请求成功的状态码
 * @param ERROR - 请求失败的状态码
 * @param TIMEOUT - 请求超时的状态码
 * @param OVERDUE - 登录过期
 */
export enum ResultEnum {
  SUCCESS = '000000',
  ERROR = '500',
  OVERDUE = '500001',
  TIMEOUT = 30000,
}

/**
 * @description：请求方法
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description：常用的 contentTyp 类型
 * @param JSON - application/json
 * @param TEXT - text/plain
 * @param FORM_URLENCODED - application/x-www-form-urlencoded
 * @param FORM_DATA - multipart/form-data
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // text
  TEXT = 'text/plain;charset=UTF-8',
  // form-data 一般配合qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data 上传
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

/**
 * @description：错误类型信息
 */
export enum ErrTypeMsg {
  DEFAULT_REQUEST_ERROR_MSG = '请求错误：404',
  NETWORK_ERROR_MSG = '网络不可用',
  REQUEST_TIMEOUT_MSG = '请求超时',
}
