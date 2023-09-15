import { APICallers } from "../types"
import { AxiosInstance } from "axios"
import { EasyCallInstanceConfig } from "../types"
import React, { createContext, useCallback } from "react"
import { createCaller } from "../helper/createCaller.helper"

export type CallerContextType = {
  easyCallConfig: EasyCallInstanceConfig
  callers: APICallers
  axiosInstance: AxiosInstance
}

export const CallerContext = createContext<CallerContextType>({
  callers: {},
  easyCallConfig: {},
  axiosInstance: {} as AxiosInstance,
})

type CallerProviderProps = {
  children?: React.ReactNode
  easyCallConfig: EasyCallInstanceConfig
}

export const CallerProvider = (props: CallerProviderProps) => {
  const createCallerCallback = useCallback(() => {
    return createCaller(props.easyCallConfig)
  }, [props.easyCallConfig])

  return (
    <CallerContext.Provider
      value={{ easyCallConfig: props.easyCallConfig, ...createCallerCallback() }}
    >
      {props.children}
    </CallerContext.Provider>
  )
}
