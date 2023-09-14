import { Callers } from "../types"
import { CallerContext } from "../context/CallerContext"
import { useState, useEffect, useContext, useCallback } from "react"
import { AxiosOnBeforeRequest, OnAfterResponse, OnBeforeRequest } from "../types/CallerHooks.type"

type MethodFunction = (callers: Callers) => Promise<any>

type CallerOptions = {
  onBeforeRequest?: OnBeforeRequest
  onAfterResponse?: OnAfterResponse
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

  const call = useCallback(() => {
    let beforeRequestId: number | null = null
    let afterResponseId: number | null = null

    if (options.onBeforeRequest) {
      beforeRequestId = axiosInstance.interceptors.request.use(
        options.onBeforeRequest as AxiosOnBeforeRequest,
      )
    }

    if (options.onAfterResponse) {
      afterResponseId = axiosInstance.interceptors.response.use(options.onAfterResponse)
    }

    if (callers && Object.keys(callers).length && methodFunction) {
      setLoading(true)

      methodFunction(callers)
        .then(setData)
        .catch(setError)
        .finally(() => {
          setLoading(false)

          if (beforeRequestId !== null) {
            axiosInstance.interceptors.request.eject(beforeRequestId)
          }

          if (afterResponseId !== null) {
            axiosInstance.interceptors.response.eject(afterResponseId)
          }
        })
    }
  }, [axiosInstance, callers, methodFunction, options])

  useEffect(() => {
    if (options.makeInitialCall) call()
  }, options.dependencies ?? [])

  return { data, error, loading, axiosInstance, easyCallConfig, call }
}
