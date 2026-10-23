'use client'

import ErrorPage from '@/shared/ui/ErrorPage'

export default function Error({ retry }: { error: unknown; retry: () => void }) {
    return <ErrorPage code="500" onRetry={retry} />
}
