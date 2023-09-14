import { AxiosInstance } from "axios"
import { Params } from "../types"
import { getUrlString } from "../helper/string.helper"

export const apiMethods = {
  get: <RESPONSE_TYPE extends unknown>(
    axiosInstance: AxiosInstance,
    endpoint: string,
    params?: Params,
  ) => axiosInstance.get<RESPONSE_TYPE>(getUrlString(endpoint, params ?? {})),

  delete: <RESPONSE_TYPE extends unknown>(
    axiosInstance: AxiosInstance,
    endpoint: string,
    params?: Params,
  ) => axiosInstance.delete<RESPONSE_TYPE>(getUrlString(endpoint, params ?? {})),

  post: <REQUEST_TYPE extends unknown, RESPONSE_TYPE extends unknown>(
    axiosInstance: AxiosInstance,
    endpoint: string,
    data: REQUEST_TYPE,
    params?: Params,
  ) => axiosInstance.post<REQUEST_TYPE, RESPONSE_TYPE>(getUrlString(endpoint, params ?? {}), data),

  put: <REQUEST_TYPE extends unknown, RESPONSE_TYPE extends unknown>(
    axiosInstance: AxiosInstance,
    endpoint: string,
    data: REQUEST_TYPE,
    params?: Params,
  ) => axiosInstance.put<REQUEST_TYPE, RESPONSE_TYPE>(getUrlString(endpoint, params ?? {}), data),

  patch: <REQUEST_TYPE extends unknown, RESPONSE_TYPE extends unknown>(
    axiosInstance: AxiosInstance,
    endpoint: string,
    data: REQUEST_TYPE,
    params?: Params,
  ) => axiosInstance.patch<REQUEST_TYPE, RESPONSE_TYPE>(getUrlString(endpoint, params ?? {}), data),
}
