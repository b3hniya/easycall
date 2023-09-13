import { AxiosInstance, InternalAxiosRequestConfig } from "axios"
import { getUrlString } from "./string.helper"
import { Callers, Params } from "../types/Caller.type"
import { generateAxiosInstance } from "./generateAxiosInstance.helper"
import { ApiRoute, EasyCallInstanceConfig } from "../types/EasycallInstance.type"

export const generateApiMethod = (
  callers: Callers,
  route: ApiRoute,
  axiosInstance: AxiosInstance,
  method: "get" | "post" | "put" | "delete" | "patch",
) => {
  const { key, endpoint } = route

  let apiMethod

  if (method === "get") {
    apiMethod = async <RESPONSE_TYPE extends unknown>(params?: Params) => {
      return axiosInstance.get<RESPONSE_TYPE>(getUrlString(endpoint, params ?? {}))
    }
  }

  if (method === "delete") {
    apiMethod = async <RESPONSE_TYPE extends unknown>(params?: Params) => {
      return axiosInstance.delete<RESPONSE_TYPE>(getUrlString(endpoint, params ?? {}))
    }
  }

  if (!(method === "get" || method === "delete")) {
    apiMethod = async <REQUEST_TYPE extends unknown, RESPONSE_TYPE extends unknown>(
      data: REQUEST_TYPE,
      params?: Params,
    ) => {
      return axiosInstance[method]<REQUEST_TYPE, RESPONSE_TYPE>(
        getUrlString(endpoint, params ?? {}),
        data,
      )
    }
  }

  callers[key] = {
    ...callers[key],
    [method]: apiMethod,
  }
}

export const generateApiMethodsBasedOnCallerConfig = (
  apiRoutes: ApiRoute[],
  axiosInstance: AxiosInstance,
) => {
  const callers: Callers = {}

  apiRoutes.forEach((route) => generateApiMethod(callers, route, axiosInstance, route.method))

  return callers as Callers
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

  let callers: Callers = {}
  if (callerConfig.apiRoutes) {
    callers = generateApiMethodsBasedOnCallerConfig(callerConfig.apiRoutes, axiosInstance)
  }

  return {
    axiosInstance,
    callers,
  }
}
