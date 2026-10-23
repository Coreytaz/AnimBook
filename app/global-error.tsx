'use client'

import ErrorPage from '@/shared/ui/ErrorPage'

export default function GlobalError({ retry }: { error: unknown; retry: () => void }) {
    return (
        <html lang="ru">
            <head>
                <title>Ошибка сервера · AnimBook</title>
            </head>
            <body style={{ margin: 0, background: '#f8f8fb', padding: '24px' }}>
                <ErrorPage code="500" onRetry={retry} />
            </body>
        </html>
    )
}
