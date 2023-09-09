import { useState, useEffect, useContext } from 'react';
import { OnAfterResponse, OnBeforeRequest } from '../types/EasycallInstance.type';
import { CallerContext } from '../context/CallerContext';
import { Callers } from '../types/Caller.type';
import _ from "lodash"

type MethodFunction = (callers: Callers) => Promise<any>
type Options = {
  beforeRequest?: OnBeforeRequest;
  afterResponse?: OnAfterResponse;
};

export function useCaller(methodFunction?: MethodFunction, options: Options = {}) {
  const { axiosInstance, callers, easyCallConfig } = useContext(CallerContext);
  console.log("callers", callers)

  const [data, setData] = useState(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (!_.isEmpty(callers) && methodFunction) {

      methodFunction(callers)
        .then((response: { data: any }) => {
          setData(response.data);
        })
        .catch((err: Error) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    return () => {
      // Cleanup effects, if necessary, e.g., cancelling a request
    };
  }, [methodFunction, options, callers, axiosInstance, easyCallConfig]);

  return { data, error, loading, axiosInstance, easyCallConfig };
}
