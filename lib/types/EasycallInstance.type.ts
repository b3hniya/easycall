import { AxiosRequestConfig } from "axios";

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

  onRequest?: (config: any) => void;
  onProcessRequestData?: (requestData: any) => any;
  onRequestError?: (error: any) => void;

  onResponse?: (responseData: any) => void;
  onProcessResponseData?: (responseData: any) => any;
  onResponseError?: (error: any) => void;

  responseDataSchema?: ResponseDataSchema;

  token?: TokenConfig;
  // This will get called when the response status is 401 and OnTokenRefresh is defined...
  onTokenRefresh?: () => Promise<void>;
};
