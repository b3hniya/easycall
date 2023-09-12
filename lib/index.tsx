import { createCaller } from "./helper/createCaller.helper"
import { useCaller } from "./hooks/useCaller"
import { CallerProvider } from "./context/CallerContext"
import React from "react"

export { useCaller, createCaller, CallerProvider }

const Main = () => {
  return (
    <CallerProvider
      easyCallConfig={{
        baseURL: "https://jsonplaceholder.typicode.com/",
        apiRoutes: [
          {
            key: "todos",
            method: "get",
            endpoint: "todos",
          },
          {
            key: "todo",
            method: "get",
            endpoint: "todo/:id",
          },
        ],
      }}
    >
      <App />
    </CallerProvider>
  )
}

function App() {
  const { data } = useCaller((caller) => caller.todos.get())
  return <div>{data}</div>
}
