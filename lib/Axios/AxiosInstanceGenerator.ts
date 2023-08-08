import axios, { AxiosInstance } from "axios";
import { EasycallInstanceConfig } from "../types/EasycallInstance.type";
import { generateAxiosBaseConfig } from "./AxiosBaseConfigGenerator";

export const axiosInstanceGenerator = (config: EasycallInstanceConfig): AxiosInstance => {
    const baseConfig = generateAxiosBaseConfig(config);
    const axiosInstance = axios.create(baseConfig);


    return axiosInstance;
}

