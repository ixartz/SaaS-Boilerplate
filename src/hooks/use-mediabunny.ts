'use client'

import * as React from 'react'

import { loadMediabunny, type MediabunnyImport } from '@/lib/mediabunny-loader'

type Status = 'idle' | 'loading' | 'ready' | 'error'

export function useMediabunny() {
  const [module, setModule] = React.useState<MediabunnyImport | null>(null)
  const [error, setError] = React.useState<Error | null>(null)
  const [status, setStatus] = React.useState<Status>('idle')

  const load = React.useCallback(async () => {
    setStatus('loading')
    setError(null)

    try {
      const mediabunny = await loadMediabunny()

      setModule(mediabunny)
      setStatus('ready')
      return mediabunny
    } catch (err) {
      const normalized = err instanceof Error ? err : new Error(String(err))
      setError(normalized)
      setStatus('error')
      throw normalized
    }
  }, [])

  React.useEffect(() => {
    load().catch(() => {
      // Error state is already handled inside `load`.
      return null
    })
  }, [load])

  return {
    mediabunny: module,
    status,
    error,
    loading: status === 'loading',
    ready: status === 'ready' && !!module,
    reload: load,
  }
}
