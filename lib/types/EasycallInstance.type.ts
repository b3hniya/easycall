import { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export type TokenConfig = {
  field: string;
  getToken: () => string;
  autoRefreshToken: boolean;
};

export type ResponseDataSchema = {
  dataSchema: any;
  autoPrune: boolean;
};

export type RetryConfig = {
  retries: number;
  retryDelay: (retryCount: number) => number;
};

export type OnBeforeRequest = (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig

export type OnError = (err: any) => any

export type OnAfterResponse = (
  value: AxiosResponse<any, any>,
) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>

export interface EasyCallInstanceConfig {
  // AXIOS CONFIG
  // if this field is populated it will ignore the following fields except for the EASY CALL CONFIG
  axiosConfig?: AxiosRequestConfig;

  baseURL?: string;
  headers?: { [key: string]: string };
  timeout?: number;
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';
  validateStatus?: (status: number) => boolean;

  // EASY CALL CONFIG

  retryConfig?: RetryConfig;

  onBeforeRequest?: OnBeforeRequest;
  onBeforeRequestError?: OnError;

  onAfterResponse?: OnAfterResponse;
  onAfterResponseError?: OnError;

  responseDataSchema?: ResponseDataSchema;

  token?: TokenConfig;
  // This will get called when the response status is 401 and OnTokenRefresh is defined...
  onTokenRefresh?: () => Promise<void>;
};
