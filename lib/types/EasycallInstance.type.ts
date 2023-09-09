import {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios"

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

export type OnBeforeRequest = (
  config: InternalAxiosRequestConfig,
) => InternalAxiosRequestConfig

export type OnError = (err: any) => any

export type OnAfterResponse = (
  value: AxiosResponse<any, any>,
) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>

export type ApiRoute = {
  key: string
  endpoint: string
  /*
        it accepts arguments that will be used to replace the endpoint by using the following format: {0}, {1}, {2}, etc...
        example:
            endpoint => '/users/{0}/posts/{1}'
            arguments => ['user_id', 'post_id'] 
            // NOTE that we pass the argument inside the caller function e.g. caller.usersPost.get(['user_id', 'post_id'])
            result => '/users/user_id/posts/post_id'
    */
  arguments?: string[]
  method: "get" | "post" | "put" | "delete" | "patch"
}

export interface EasyCallInstanceConfig {
  // AXIOS CONFIG
  // if this field is populated it will ignore the following fields except for the EASY CALL CONFIG
  axiosConfig?: AxiosRequestConfig

  baseURL?: string
  headers?: { [key: string]: string }
  timeout?: number
  responseType?:
    | "arraybuffer"
    | "blob"
    | "document"
    | "json"
    | "text"
    | "stream"
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
