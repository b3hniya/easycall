import {
  TokenConfig,
  ResponseDataSchema,
  RetryConfig,
  ApiRoute,
  EasyCallInstanceConfig,
} from "./EasycallInstance.type"

import { APICallers, Caller } from "./Caller.type"
import { OnAfterResponse, OnBeforeRequest, OnError } from "./Middlewares.type"
import { URLParams } from "./Methods.type"

export {
  TokenConfig,
  ResponseDataSchema,
  RetryConfig,
  OnBeforeRequest,
  OnError,
  OnAfterResponse,
  ApiRoute,
  EasyCallInstanceConfig,
  URLParams,
  Caller,
  APICallers,
}
