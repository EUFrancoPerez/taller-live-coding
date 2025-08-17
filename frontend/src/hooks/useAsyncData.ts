import { useState, useEffect, useCallback } from 'react';

interface AsyncDataState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export const useAsyncData = <T>(
  fetchFn: () => Promise<T>,
  dependencies: any[] = []
) => {
  const [state, setState] = useState<AsyncDataState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const data = await fetchFn();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error('Unknown error'),
      });
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch,
  };
};

// Example usage with Suspense-compatible data fetching
export const createSuspenseResource = <T>(fetchFn: () => Promise<T>) => {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: T;
  let error: Error;

  const promise = fetchFn()
    .then((data) => {
      status = 'success';
      result = data;
    })
    .catch((err) => {
      status = 'error';
      error = err;
    });

  return {
    read(): T {
      switch (status) {
        case 'pending':
          throw promise;
        case 'error':
          throw error;
        case 'success':
          return result;
        default:
          throw new Error('Unknown status');
      }
    },
  };
};
