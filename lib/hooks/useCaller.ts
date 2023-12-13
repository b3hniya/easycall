import { CallerContext } from "../context/CallerContext"
import { AxiosInstance, AxiosRequestConfig } from "axios"
import { useState, useEffect, useContext, useCallback } from "react"
import { APICallers, OnAfterResponse, OnBeforeRequest } from "../types"

type APICallFunction = (callers: APICallers) => Promise<any>

type APICallOptions = {
  onBeforeRequest?: OnBeforeRequest
  onAfterResponse?: OnAfterResponse
  dependencies?: any[]
  makeInitialCall?: boolean
}

const compositeApplyMiddleWare =
  (apiCallOptions: APICallOptions, axiosInstance: AxiosInstance, callers: APICallers) =>
  (apiCallFunction: APICallFunction) => {
    if (apiCallOptions.onBeforeRequest)
      apiCallOptions.onBeforeRequest(axiosInstance.defaults as AxiosRequestConfig)

    return apiCallFunction(callers)
      .then((res) => (apiCallOptions.onAfterResponse ? apiCallOptions.onAfterResponse(res) : res))
      .catch((err) => {
        throw err
      })
  }

export function useCaller<DATA_TYPE extends unknown = any, RESPONSE_TYPE extends unknown = any>(
  apiCallFunction: APICallFunction,
  apiCallOptions: APICallOptions,
) {
  const [data, setData] = useState<DATA_TYPE>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const { axiosInstance, callers, easyCallConfig } = useContext(CallerContext)

  if (typeof apiCallOptions.makeInitialCall === "undefined") apiCallOptions.makeInitialCall = true

  const applyMiddleware = compositeApplyMiddleWare(apiCallOptions, axiosInstance, callers)

  const call = useCallback<() => Promise<RESPONSE_TYPE>>(() => {
    setLoading(true)

    return applyMiddleware(apiCallFunction)
      .then((res) => {
        setData(res)
        return res
      })
      .catch((err) => {
        setError(err)
        throw err
      })
      .finally(() => {
        setLoading(false)
      })
  }, [apiCallFunction, apiCallOptions])

  useEffect(() => {
    if (apiCallOptions.makeInitialCall || apiCallOptions.dependencies) call()
  }, apiCallOptions.dependencies ?? [])

  return { data, error, loading, axiosInstance, easyCallConfig, call, setError }
}
