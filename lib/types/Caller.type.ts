import { ApiRoute } from "./EasycallInstance.type"

export type Params = {
  args?: string[]
  queryString?: string
}

export type Caller = {
  get?: <RESPONSE_TYPE extends unknown>(params?: Params) => Promise<RESPONSE_TYPE>
  post?: <REQUEST_TYPE extends unknown, RESPONSE_TYPE extends unknown>(data: REQUEST_TYPE, params?: Params) => Promise<RESPONSE_TYPE>
  put?: <REQUEST_TYPE extends unknown, RESPONSE_TYPE extends unknown>(data: REQUEST_TYPE, params?: Params) => Promise<RESPONSE_TYPE>
  delete?: <RESPONSE_TYPE extends unknown>(params?: Params) => Promise<RESPONSE_TYPE>
}

export type Callers = {
  [key: ApiRoute['key']]: Caller;
}