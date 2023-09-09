import { createCaller } from "../lib/helper/createCaller.helper"

describe("creates api methods", () => {

  it("it creates api methods based on given endpoints", async () => {
    // ARRANGE
    const { callers } = createCaller({
      baseURL: "https://jsonplaceholder.typicode.com/",
      timeout: 5000,
      apiRoutes: [
        {
          key: "todo",
          method: "get",
          endpoint: "todo",
        }
      ]
    })

    const data = await callers?.todo?.get?.()
    console.log(data)
  })

})