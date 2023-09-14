import { Params } from "../types/Caller.type"

export const formatString = (text: string, ...args: string[]) =>
  text.replace(/{(\d+)}/g, (match, number) =>
    typeof args[number] !== "undefined" ? args[number] : match,
  )

export const getUrlString = (endpoint: string, params: Params) =>
  formatString(endpoint, ...(params?.args ?? [])) + (params?.queryString ?? "")
