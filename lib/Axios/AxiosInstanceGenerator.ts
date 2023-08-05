import _ from "lodash";
import axios from "axios";
import { EasycallInstanceConfig } from "../types/Easycall.type";
import { generateAxiosBaseConfig } from "./AxiosBaseConfigGenerator";

export const axiosInstanceGenerator = (config: EasycallInstanceConfig) => {
    const baseConfig = generateAxiosBaseConfig(config);
    const axiosInstance = axios.create(baseConfig);


    return axiosInstance;
}

