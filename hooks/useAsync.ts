'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

export function useAsync<T>(
  fn: () => Promise<T>,
  deps: unknown[] = [],
  { throwOnError = true, initialData = null }: { throwOnError?: boolean; initialData?: T | null } = {},
): AsyncState<T> & { refetch: () => void } {
  const [state, setState] = useState<AsyncState<T>>({
    data: initialData ?? null,
    loading: initialData === null,
    error: null,
  })

  // Skip the very first fetch if we already have initialData
  const isFirstRun = useRef(true)

  const execute = useCallback(() => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    fn()
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err: unknown) => {
        const error = err instanceof Error ? err : new Error('Erreur inconnue')
        setState({ data: null, loading: false, error })
      })
  }, deps)

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      // If we have initial data, skip the first fetch — data is already from SSR
      if (initialData !== null) return
    }
    execute()
  }, [execute])

  if (throwOnError && state.error) throw state.error

  return { ...state, refetch: execute }
}
