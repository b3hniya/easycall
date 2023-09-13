import { useState, useEffect, useContext } from "react"
import { OnAfterResponse, OnBeforeRequest } from "../types/EasycallInstance.type"
import { CallerContext } from "../context/CallerContext"
import { Callers } from "../types"
import _ from "lodash"

type MethodFunction = (callers: Callers) => Promise<any>
type Options = {
  onBeforeRequest?: OnBeforeRequest
  onAfterResponse?: OnAfterResponse
  dependencies?: any[]
}

export function useCaller(methodFunction: MethodFunction, options: Options = {}) {
  const { axiosInstance, callers, easyCallConfig } = useContext(CallerContext)

  const [data, setData] = useState(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const call = () => {
    if (!_.isEmpty(callers) && methodFunction) {
      setLoading(true)

      methodFunction(callers)
        .then((response) => {
          setData(response)
        })
        .catch((err: Error) => {
          setError(err)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  useEffect(() => {
    call()

    return () => {
      // Cleanup effects, if necessary, e.g., cancelling a request
    }
  }, options.dependencies ?? [])

  return { data, error, loading, axiosInstance, easyCallConfig, call }
}
