import { useContext } from "react"
import { CallerContext } from "../context/CallerContext"

export const useGetCaller = (callerName: string) => {
  const { callers } = useContext(CallerContext)

  return {
    call: callers[callerName],
  }
}
