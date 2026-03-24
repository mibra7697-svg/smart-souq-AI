'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { AxiosError } from 'axios';

export function useApi<T>(url: string, options?: { skip?: boolean }) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!options?.skip);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(url);
      setData(response.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!options?.skip) {
      fetchData();
    }
  }, [url]);

  const refetch = () => fetchData();

  return { data, loading, error, refetch };
}
