import { useContext } from "react"
import { CallerContext } from "../context/CallerContext"

export const useGetCallers = () => {
  const { axiosInstance, callers, easyCallConfig } = useContext(CallerContext)

  return {
    callers,
    axiosInstance,
    easyCallConfig,
  }
}
