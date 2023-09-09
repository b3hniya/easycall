
export type Params = {
  args?: string[]
  queryString?: string
}

export type Caller = {
  get?: (params?: Params) => Promise<any>
  post?: (data: any, params?: Params) => Promise<any>
  put?: (data: any, params?: Params) => Promise<any>
  delete?: (params?: Params) => Promise<any>
}


export type Callers = {
  [Key: string]: Caller
}
