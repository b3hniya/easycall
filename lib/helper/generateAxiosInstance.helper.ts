import { EasyCallInstanceConfig } from "../types"
import axios, { AxiosInstance, CreateAxiosDefaults } from "axios"

const defaultValidateStatus = (status: number) => status >= 200 && status <= 299

const generateAxiosBaseConfig = (config: EasyCallInstanceConfig): CreateAxiosDefaults =>
  config.axiosConfig ?? {
    baseURL: config.baseURL,
    headers: config.headers,
    timeout: config.timeout,
    responseType: config.responseType,
    validateStatus: config.validateStatus ?? defaultValidateStatus,
  }

export const generateAxiosInstance = (config: EasyCallInstanceConfig): AxiosInstance => {
  const baseConfig = generateAxiosBaseConfig(config)
  return axios.create(baseConfig)
}
