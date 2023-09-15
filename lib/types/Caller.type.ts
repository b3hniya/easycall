import { DeleteMethod, GetMethod, PostMethod, PutMethod } from "./Methods.type"

export type Caller = {
  get: GetMethod
  put: PutMethod
  post: PostMethod
  delete: DeleteMethod
}

export type APICallers = {
  [key: string]: Caller
}
