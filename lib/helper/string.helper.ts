import {URLParams} from "../types/Methods.type";

export const formatString = (text: string, ...args: string[]) =>
  text.replace(/{(\d+)}/g, (match, number) =>
    typeof args[number] !== "undefined" ? args[number] : match,
  )

export const getUrlString = (endpoint: string, params: URLParams) =>
  formatString(endpoint, ...(params?.args ?? [])) + (params?.queryString ?? "")
