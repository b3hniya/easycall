import React from "react"
import { useGetCaller } from "../lib"

describe("useGetCaller", () => {
  it("should return the correct caller when a valid caller name is provided", () => {
    const callerName = "testCaller"
    const mockCall = jest.fn()
    const mockContext = {
      callers: {
        [callerName]: mockCall,
      },
    }

    jest.spyOn(React, "useContext").mockReturnValue(mockContext)

    const { call } = useGetCaller(callerName)

    expect(call).toBe(mockCall)
  })

  it("should return undefined when an invalid caller name is provided", () => {
    const callerName = "invalidCaller"
    const mockContext = {
      callers: {},
    }

    jest.spyOn(React, "useContext").mockReturnValue(mockContext)

    const { call } = useGetCaller(callerName)

    expect(call).toBeUndefined()
  })
})
