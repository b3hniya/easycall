import { CreateAxiosDefaults } from "axios";
import { EasycallInstanceConfig } from "../types/Easycall.type";


export const generateAxiosBaseConfig = (config: EasycallInstanceConfig): CreateAxiosDefaults =>
    config.axiosConfig ??
    {
        baseURL: config.baseURL,
        headers: config.headers,
        timeout: config.timeout,
        responseType: config.responseType,
        validateStatus: config.validateStatus
    }