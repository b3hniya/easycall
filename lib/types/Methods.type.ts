export type URLParams = {
  args?: string[]
  queryString?: string
}

export type GetMethod = <RESPONSE_TYPE extends unknown = any>(
  params?: URLParams,
) => Promise<RESPONSE_TYPE>

export type PostMethod = <REQUEST_TYPE extends unknown, RESPONSE_TYPE extends unknown = any>(
  data: REQUEST_TYPE,
  params?: URLParams,
) => Promise<RESPONSE_TYPE>

export type PutMethod = <REQUEST_TYPE extends unknown, RESPONSE_TYPE extends unknown = any>(
  data: REQUEST_TYPE,
  params?: URLParams,
) => Promise<RESPONSE_TYPE>

export type DeleteMethod = <RESPONSE_TYPE extends unknown = any>(
  params?: URLParams,
) => Promise<RESPONSE_TYPE>
