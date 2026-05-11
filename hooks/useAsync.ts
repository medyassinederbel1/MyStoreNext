'use client'

import { useEffect, useState, useCallback } from 'react'

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}


export function useAsync<T>(
  fn: () => Promise<T>,
  deps: unknown[] = [],
  { throwOnError = true }: { throwOnError?: boolean } = {},
): AsyncState<T> & { refetch: () => void } {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  const execute = useCallback(
    () => {
      setState((prev) => ({ ...prev, loading: true, error: null }))
      fn()
        .then((data) => setState({ data, loading: false, error: null }))
        .catch((err: unknown) => {
          const error = err instanceof Error ? err : new Error('Erreur inconnue')
          setState({ data: null, loading: false, error })
        })
    },
    
    deps,
  )

  useEffect(() => {
    execute()
  }, [execute])

  if (throwOnError && state.error) throw state.error

  return { ...state, refetch: execute }
}
