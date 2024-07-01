import { AxiosResponse } from "axios";
import { useState, useEffect, useCallback } from "react";

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const useFetch = <T>(
  fetchFunction: () => Promise<AxiosResponse<T>>,
  isChangingParams?: boolean,
): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Memoize the fetch function to prevent unnecessary re-fetching
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedFetchFunction = useCallback(fetchFunction, [
    isChangingParams && fetchFunction,
  ]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await memoizedFetchFunction();
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    }
  }, [memoizedFetchFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData, setLoading };
};

export default useFetch;
