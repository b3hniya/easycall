import axios, { CreateAxiosDefaults, AxiosInstance } from "axios";
import { EasyCallInstanceConfig } from "../types/EasyCallInstance.type";


const generateAxiosBaseConfig = (config: EasyCallInstanceConfig): CreateAxiosDefaults =>
    config.axiosConfig ??
    {
        baseURL: config.baseURL,
        headers: config.headers,
        timeout: config.timeout,
        responseType: config.responseType,
        validateStatus: config.validateStatus
    }


export const generateAxiosInstance = (config: EasyCallInstanceConfig): AxiosInstance => {
    const baseConfig = generateAxiosBaseConfig(config);
    const axiosInstance = axios.create(baseConfig);


    return axiosInstance;
}

