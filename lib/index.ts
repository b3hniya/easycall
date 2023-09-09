import { createCaller } from "./helper/createCaller.helper"
import { ApiRoute } from "./types/EasycallInstance.type"
const apiRoutes: ApiRoute[] = [
  {
    key: "todos",
    method: "get",
    endpoint: "todos",
  },
  {
    key: "todos2",
    method: "post",
    endpoint: "todos",
  }
]
const { callers } = createCaller({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 5000,
  apiRoutes
})


console.log(callers)
