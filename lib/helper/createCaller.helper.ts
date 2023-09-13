import { apiMethods } from "../constants"
import { Callers } from "../types/Caller.type"
import { AxiosInstance, InternalAxiosRequestConfig } from "axios"
import { generateAxiosInstance } from "./generateAxiosInstance.helper"
import { ApiRoute, EasyCallInstanceConfig } from "../types/EasycallInstance.type"

const generateApiMethod = (callers: Callers, route: ApiRoute, axiosInstance: AxiosInstance) => {
  const { key, endpoint, method } = route

  callers[key] = {
    ...callers[key],
    [method]: apiMethods[method].bind(null, axiosInstance, endpoint), // binding the axiosInstance and endpoint so they're pre-filled for each call
  }
}

export const generateApiMethodsBasedOnCallerConfig = (
  apiRoutes: ApiRoute[],
  axiosInstance: AxiosInstance,
) => {
  const callers: Callers = {}
  apiRoutes.forEach((route) => generateApiMethod(callers, route, axiosInstance))
  return callers
}

export type AxiosOnBeforeRequest = (
  conf: InternalAxiosRequestConfig<any>,
) => InternalAxiosRequestConfig<any>

export const createCaller = (callerConfig: EasyCallInstanceConfig) => {
  const axiosInstance = generateAxiosInstance(callerConfig)

  axiosInstance.interceptors.request.use(
    callerConfig?.onBeforeRequest as AxiosOnBeforeRequest,
    callerConfig?.onBeforeRequestError,
  )

  axiosInstance.interceptors.response.use(
    callerConfig?.onAfterResponse,
    callerConfig?.onAfterResponseError,
  )

  const callers: Callers = callerConfig.apiRoutes
    ? generateApiMethodsBasedOnCallerConfig(callerConfig.apiRoutes, axiosInstance)
    : {}

  return {
    axiosInstance,
    callers,
  }
}
