import { createCaller } from "./helper/createCaller.helper"

const { callers } = createCaller({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 5000,
  apiRoutes: [
    {
      key: "todos",
      method: "get",
      endpoint: "todos/{0}",
    }
  ]
})

callers?.todos?.get?.({
  args: ["1"]
}).then((res: any) => console.log(res.data))