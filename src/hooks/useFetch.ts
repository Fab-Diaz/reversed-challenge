import {useCallback, useState} from 'react';
import {ApiError} from "@/types/errors";

const useFetch = () => {
  const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again!'
  const [apiError, setApiError] = useState<string>('');

  const fetchData = useCallback(async (url: string, errorList?: ApiError[]) =>
    fetch(`${process.env.apiUrl}${url}`,
      {headers: {'Authorization': `Bearer ${process.env.apiKey}`}}
    ).then(async (res) => {
      const error = errorList?.find(({status}: ApiError) => status === res.status)
      if (error) {
        setApiError(error.message)
        return null
      } else if (res.status !== 200) {
        setApiError(DEFAULT_ERROR_MESSAGE)
        return null
      } else {
        setApiError('')
        return await res.json()
      }
    }).catch((e) => {
      console.error(e)
      setApiError(DEFAULT_ERROR_MESSAGE)
    }), [])

  return { apiError, fetchData };
};

export default useFetch;
