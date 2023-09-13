import React, { createContext, useCallback } from "react"
import { EasyCallInstanceConfig } from "../types/EasycallInstance.type"
import { createCaller } from "../helper/createCaller.helper"
import { Callers } from "../types/Caller.type"
import { AxiosInstance } from "axios"

export type CallerContextType = {
  easyCallConfig: EasyCallInstanceConfig
  callers: Callers
  axiosInstance: AxiosInstance
}

export const CallerContext = createContext<CallerContextType>({
  easyCallConfig: {},
  callers: {},
  axiosInstance: {} as AxiosInstance,
})

type CallerProviderProps = {
  easyCallConfig: EasyCallInstanceConfig
  children?: React.ReactNode
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
