const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly type: 'network' | 'http' = 'http',
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<{ data: T; headers: Headers }> {
  let res: Response
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch {
    throw new ApiError(
      `Impossible de joindre le serveur (${BASE_URL}). Vérifiez que l\'API est démarrée sur le port 3001.`,
      undefined,
      'network',
    )
  }

  if (!res.ok) {
    throw new ApiError(`Erreur ${res.status} — ${res.statusText}`, res.status, 'http')
  }

  const data = (await res.json()) as T
  return { data, headers: res.headers }
}
