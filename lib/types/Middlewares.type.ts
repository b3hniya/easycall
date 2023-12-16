import { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios"

export type AxiosOnBeforeRequest = (
  conf: InternalAxiosRequestConfig<any>,
) => InternalAxiosRequestConfig<any>

export type OnBeforeRequest = (config: AxiosRequestConfig) => AxiosRequestConfig

export type OnAfterResponse = (
  value: AxiosResponse<any, any>,
) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>

export type OnAfterResponseError = (err: AxiosError<any>) => AxiosError<any>

export type OnError = (err: any) => any
