import { apiMethods } from "../constants"
import { Callers } from "../types/Caller.type"
import { AxiosInstance, InternalAxiosRequestConfig } from "axios"
import { generateAxiosInstance } from "./generateAxiosInstance.helper"
import { EasyCallInstanceConfig } from "../types/EasycallInstance.type"

export type AxiosOnBeforeRequest = (
  conf: InternalAxiosRequestConfig<any>,
) => InternalAxiosRequestConfig<any>

export const generateCallers = (
  callerConfig: EasyCallInstanceConfig,
  axiosInstance: AxiosInstance,
) => {
  const callers: Callers = {}

  if (callerConfig.apiRoutes) {
    callerConfig.apiRoutes.forEach(({ key, endpoint, method }) => {
      callers[key] = {
        ...callers[key],
        [method]: apiMethods[method].bind(null, axiosInstance, endpoint),
      }
    })
  }

  return callers
}

export const createAxiosInstance = (callerConfig: EasyCallInstanceConfig) => {
  const axiosInstance = generateAxiosInstance(callerConfig)

  if (callerConfig?.onBeforeRequest || callerConfig?.onBeforeRequestError) {
    axiosInstance.interceptors.request.use(
      callerConfig.onBeforeRequest as AxiosOnBeforeRequest,
      callerConfig.onBeforeRequestError,
    )
  }

  if (callerConfig?.onAfterResponse || callerConfig?.onAfterResponseError) {
    axiosInstance.interceptors.response.use(
      callerConfig.onAfterResponse,
      callerConfig.onAfterResponseError,
    )
  }

  return axiosInstance
}

export const createCaller = (callerConfig: EasyCallInstanceConfig) => {
  const axiosInstance = createAxiosInstance(callerConfig)
  const callers = generateCallers(callerConfig, axiosInstance)

  return {
    axiosInstance,
    callers,
  }
}
