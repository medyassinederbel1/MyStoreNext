'use client'

import ErrorDisplay from '@/components/ErrorDisplay'

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ProductError({ error, reset }: Props) {
  return <ErrorDisplay error={error} reset={reset} context="product" />
}
