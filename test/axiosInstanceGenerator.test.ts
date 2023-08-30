import { AxiosInstance } from 'axios';
import { EasyCallInstanceConfig } from '../lib/types/EasyCallInstance.type';
import { generateAxiosInstance } from '../lib/helper/generateAxiosInstance.helper';

describe('axiosInstanceGenerator', () => {
    let config: EasyCallInstanceConfig;
    let axiosInstance: AxiosInstance;

    beforeEach(() => {
        config = {
            axiosConfig: {
                baseURL: 'https://example.com',
            },
            baseURL: 'https://test.com',
            timeout: 5000,
        };

        axiosInstance = generateAxiosInstance(config);
    });

    it('should create an axios instance', () => {
        expect(axiosInstance).toBeTruthy();
    });

    it('should use the baseURL from the axiosConfig if provided', () => {
        expect(axiosInstance.defaults.baseURL).toBe(config?.axiosConfig?.baseURL);
    });

    it('should ignore other config values if axiosConfig is provided', () => {
        expect(axiosInstance.defaults.timeout).not.toBe(config.timeout);
    });

    it('should use the baseURL from the config if axiosConfig is not provided', () => {
        delete config.axiosConfig;
        axiosInstance = generateAxiosInstance(config);
        expect(axiosInstance.defaults.baseURL).toBe(config.baseURL);
    });
});

