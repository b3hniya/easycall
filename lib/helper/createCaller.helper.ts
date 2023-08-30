import { EasyCallInstanceConfig } from "../types/EasyCallInstance.type";
import { generateAxiosInstance } from "./generateAxiosInstance.helper";

export const createCaller = (callerConfig: EasyCallInstanceConfig) => {
    const axiosInstance = generateAxiosInstance(callerConfig);
    axiosInstance.interceptors.request.use(callerConfig?.onBeforeRequest, callerConfig?.onBeforeRequestError)
    axiosInstance.interceptors.response.use(callerConfig?.onAfterResponse, callerConfig?.onAfterResponseError)

    return axiosInstance;
}