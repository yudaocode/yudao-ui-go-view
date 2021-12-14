/**
 * @description: 请求结果集
 */
export enum ResultEnum {
  DATA_SUCCESS = 0,
  SUCCESS = 200,
  SERVER_ERROR = 500,
  SERVER_FORBIDDEN = 403,
  NOT_FOUND = 404,
  TIMEOUT = 10042,
}

/**
 * @description: 请求方法
 */
export enum RequestEnum {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  PUT = 'put',
  DELETE = 'delete',
}

/**
 * @description:  常用的contentTyp类型
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // json
  TEXT = 'text/plain;charset=UTF-8',
  // form-data 一般配合qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  上传
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
