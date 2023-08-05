import { AxiosRequestConfig } from "axios";

export type TokenConfig = {
  field: string;
  getToken: () => string;
};

export type ResponseDataSchema = {};

export type RetryConfig = {
  retries: number;
  retryDelay: (retryCount: number) => number;
};

export interface EasycallInstanceConfig {
  // AXIOS CONFIG
  // if this field is populated it will ignore the following fields except for the EASY CALL CONFIG
  axiosConfig?: AxiosRequestConfig;

  baseUrl?: string;
  headers?: { [key: string]: string };
  timeout?: number;
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';
  validateStatus?: (status: number) => boolean;

  // EASY CALL CONFIG
  onInitHeaders?: () => { [key: string]: string };

  token?: TokenConfig;

  onBeforeRequest?: (config: AxiosRequestConfig) => void;
  onAfterRequest?: () => void;

  onRequestError?: (error: any) => void;
  onResponseError?: (error: any) => void;

  onBeforeRetry?: (response: any) => void;
  onAfterRetry?: () => void;

  retryConfig?: RetryConfig;

  onTokenRefresh?: () => Promise<void>;

  onProcessRequest?: (requestData: any) => any;
  onProcessResponse?: (responseData: any) => any;

  onAfterResponse?: (responseData: any) => void;

  responseDataSchema?: ResponseDataSchema;
};
