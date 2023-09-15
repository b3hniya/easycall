import { AxiosInstance } from "axios"
import { URLParams } from "../types"
import { getUrlString } from "../helper/string.helper"

export const apiMethods = {
  get: <RESPONSE_TYPE extends unknown>(
    axiosInstance: AxiosInstance,
    endpoint: string,
    params?: URLParams,
  ) => axiosInstance.get<RESPONSE_TYPE>(getUrlString(endpoint, params ?? {})),

  delete: <RESPONSE_TYPE extends unknown>(
    axiosInstance: AxiosInstance,
    endpoint: string,
    params?: URLParams,
  ) => axiosInstance.delete<RESPONSE_TYPE>(getUrlString(endpoint, params ?? {})),

  post: <REQUEST_TYPE extends unknown, RESPONSE_TYPE extends unknown>(
    axiosInstance: AxiosInstance,
    endpoint: string,
    data: REQUEST_TYPE,
    params?: URLParams,
  ) => axiosInstance.post<REQUEST_TYPE, RESPONSE_TYPE>(getUrlString(endpoint, params ?? {}), data),

  put: <REQUEST_TYPE extends unknown, RESPONSE_TYPE extends unknown>(
    axiosInstance: AxiosInstance,
    endpoint: string,
    data: REQUEST_TYPE,
    params?: URLParams,
  ) => axiosInstance.put<REQUEST_TYPE, RESPONSE_TYPE>(getUrlString(endpoint, params ?? {}), data),

  patch: <REQUEST_TYPE extends unknown, RESPONSE_TYPE extends unknown>(
    axiosInstance: AxiosInstance,
    endpoint: string,
    data: REQUEST_TYPE,
    params?: URLParams,
  ) => axiosInstance.patch<REQUEST_TYPE, RESPONSE_TYPE>(getUrlString(endpoint, params ?? {}), data),
}
