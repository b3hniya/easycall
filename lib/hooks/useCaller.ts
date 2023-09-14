import { Callers } from "../types"
import { CallerContext } from "../context/CallerContext"
import { useState, useEffect, useContext, useCallback } from "react"

type MethodFunction = (callers: Callers) => Promise<any>

type CallerOptions = {
  onBeforeRequest?: (config: any) => any
  onAfterResponse?: (response: any) => any
  dependencies?: any[]
  makeInitialCall?: boolean
}

export function useCaller(
  methodFunction: MethodFunction,
  options: CallerOptions = { makeInitialCall: true },
) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const { axiosInstance, callers, easyCallConfig } = useContext(CallerContext)
  if (typeof options.makeInitialCall === "undefined") options.makeInitialCall = true

  const applyMiddleware = (methodFunction: MethodFunction) => {
    if (options.onBeforeRequest) {
      options.onBeforeRequest(axiosInstance.defaults)
    }

    return methodFunction(callers)
      .then((res) => {
        if (options.onAfterResponse) {
          return options.onAfterResponse(res)
        }
        return res
      })
      .catch((err) => {
        throw err
      })
  }

  const call = useCallback(() => {
    setLoading(true)

    applyMiddleware(methodFunction)
      .then(setData)
      .catch(setError)
      .finally(() => {
        setLoading(false)
      })
  }, [methodFunction, options])

  useEffect(() => {
    if (options.makeInitialCall) call()
  }, options.dependencies ?? [])

  return { data, error, loading, axiosInstance, easyCallConfig, call }
}
