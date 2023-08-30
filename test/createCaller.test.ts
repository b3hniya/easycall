import { AxiosInstance } from 'axios';
import { EasyCallInstanceConfig } from '../lib/types/EasyCallInstance.type';
import { createCaller } from '../lib/helper/createCaller.helper';

describe('createCaller', () => {
    let config: EasyCallInstanceConfig;
    let axiosInstance: AxiosInstance;

    beforeEach(() => {
        config = {
            baseURL: 'https://jsonplaceholder.typicode.com/',
            timeout: 5000,
        };
    });

    it('should create an axios instance', () => {
        axiosInstance = createCaller(config);
        expect(axiosInstance).toBeTruthy();
    });

    it('should use the baseURL from the config', () => {
        axiosInstance = createCaller(config);
        expect(axiosInstance.defaults.baseURL).toBe(config.baseURL);
    });

    it('should call onRequest before making a request', async () => {
        let requestHookCalled = false;

        config.onBeforeRequest = (conf) => {
            requestHookCalled = true;
            return conf;
        };

        axiosInstance = createCaller(config);
        await axiosInstance.get('/todos');

        expect(requestHookCalled).toBe(true);
    });


    // ... Additional tests for other hooks, retryConfig, token, etc.
    it('should call onTokenRefresh on 401 response when defined', async () => {
        let tokenRefreshed = false;

        config.onTokenRefresh = async () => {
            tokenRefreshed = true;
        };

        // Mocking a 401 response
        jest.mock('axios', () => ({
            get: jest.fn(() => Promise.reject({ response: { status: 401 } })),
        }));

        axiosInstance = createCaller(config);
        try {
            await axiosInstance.get('/endpoint-that-returns-401');
        } catch (error) {
            // Expected error to be thrown due to mock 401.
        }

        expect(tokenRefreshed).toBe(true);
    });

});