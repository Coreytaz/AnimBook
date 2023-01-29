'use client'
import { NextUIProvider } from '@nextui-org/react'
import './globals.scss'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
            <head />
            <body>
                <NextUIProvider>{children}</NextUIProvider>
            </body>
        </html>
    )
}
