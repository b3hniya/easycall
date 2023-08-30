import { EasyCallInstanceConfig } from "../types/EasyCallInstance.type";
import { generateAxiosInstance } from "./generateAxiosInstance.helper";

export const createCaller = (callerConfig: EasyCallInstanceConfig) => {
    const axiosInstance = generateAxiosInstance(callerConfig);


    return axiosInstance;
}