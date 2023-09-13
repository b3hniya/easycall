export type Params = {
  args?: string[]
  queryString?: string
}

type Get = <RESPONSE_TYPE extends unknown>(params?: Params) => Promise<RESPONSE_TYPE>

type Post = <REQUEST_TYPE extends unknown, RESPONSE_TYPE extends unknown>(
  data: REQUEST_TYPE,
  params?: Params,
) => Promise<RESPONSE_TYPE>

type Put = <REQUEST_TYPE extends unknown, RESPONSE_TYPE extends unknown>(
  data: REQUEST_TYPE,
  params?: Params,
) => Promise<RESPONSE_TYPE>

type Delete = <RESPONSE_TYPE extends unknown>(params?: Params) => Promise<RESPONSE_TYPE>

export type Caller = {
  get: Get

  post: Post

  put: Put

  delete: Delete
}

export type Callers = {
  [key: string]: Caller
}
