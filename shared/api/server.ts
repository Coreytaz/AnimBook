import 'server-only'
import { notFound } from 'next/navigation'

/** Public API reads only. User-specific data must use uncached authenticated requests. */
export async function serverGet<T>(path: string, revalidate: number | false = 300): Promise<T> {
    const base = process.env.API_URL
    if (!base) throw new Error('API_URL is required for server rendering')
    const controller = new AbortController()
    // Next.js annotates thrown errors. DOMException.message is read-only,
    // so abort with an ordinary Error instead of AbortSignal.timeout().
    const timer = setTimeout(() => {
        controller.abort(new Error('Public API request timed out after 15000ms: ' + path))
    }, 15000)
    try {
        const response = await fetch(base.replace(/\/$/, '') + path, {
            ...(revalidate === false ? { cache: 'no-store' as const } : { next: { revalidate } }),
            signal: controller.signal,
        })
        if (response.status === 404) notFound()
        if (!response.ok)
            throw new Error('Public API request failed: ' + response.status + ' ' + path)
        return (await response.json()) as T
    } finally {
        clearTimeout(timer)
    }
}
