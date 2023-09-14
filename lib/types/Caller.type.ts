export type Params = {
  args?: string[]
  queryString?: string
}

export type Get = <RESPONSE_TYPE extends unknown>(params?: Params) => Promise<RESPONSE_TYPE>

export type Post = <REQUEST_TYPE extends unknown, RESPONSE_TYPE extends unknown>(
  data: REQUEST_TYPE,
  params?: Params,
) => Promise<RESPONSE_TYPE>

export type Put = <REQUEST_TYPE extends unknown, RESPONSE_TYPE extends unknown>(
  data: REQUEST_TYPE,
  params?: Params,
) => Promise<RESPONSE_TYPE>

export type Delete = <RESPONSE_TYPE extends unknown>(params?: Params) => Promise<RESPONSE_TYPE>

export type Caller = {
  get: Get
  put: Put
  post: Post
  delete: Delete
}

export type Callers = {
  [key: string]: Caller
}
