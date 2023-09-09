export type Caller = {
  get?: () => Promise<any>
  post?: (data: any) => Promise<any>
  put?: (data: any) => Promise<any>
  delete?: () => Promise<any>
}


export type Callers = {
  [Key: string]: Caller
}
