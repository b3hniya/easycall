import { AxiosRequestConfig } from "axios"
import { OnAfterResponse, OnBeforeRequest, OnError } from "./Middlewares.type"

export type TokenConfig = {
  field: string
  getToken: () => string
  autoRefreshToken: boolean
}

export type ResponseDataSchema = {
  dataSchema: any
  autoPrune: boolean
}

export type RetryConfig = {
  retries: number
  retryDelay: (retryCount: number) => number
}

/**
 * NOTE: the endpoint accepts arguments that will be used to replace the endpoint by using the following format: {0}, {1}, {2}, etc...
 * example: if the endpoint is: '/users/{0}/posts/{1}' and the arguments are: ['user_id', 'post_id']
 * the result is going to be like: '/users/user_id/posts/post_id'
 */
export type ApiRoute = {
  key: string
  endpoint: string
  method: "get" | "post" | "put" | "delete" | "patch"
}

export interface EasyCallInstanceConfig {
  // AXIOS CONFIG
  // if this field is populated it will ignore the following fields except for the EASY CALL CONFIG
  axiosConfig?: AxiosRequestConfig

  baseURL?: string
  headers?: { [key: string]: string }
  timeout?: number
  responseType?: "arraybuffer" | "blob" | "document" | "json" | "text" | "stream"
  validateStatus?: (status: number) => boolean

  // EASY CALL CONFIG

  retryConfig?: RetryConfig

  onBeforeRequest?: OnBeforeRequest
  onBeforeRequestError?: OnError

  onAfterResponse?: OnAfterResponse
  onAfterResponseError?: OnError

  responseDataSchema?: ResponseDataSchema

  token?: TokenConfig

  // This will get called when the response status is 401 and OnTokenRefresh is defined...
  onTokenRefresh?: () => Promise<void>

  apiRoutes?: ApiRoute[]
}
