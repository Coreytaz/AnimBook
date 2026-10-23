'use client'
import { useTheme } from '@/shared'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { Toast } from '@heroui/react'
import './globals.css'
import Providers from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { isDark } = useTheme()
    return (
        <html lang="ru">
            <head />
            <body>
                <Providers isDark={isDark}>
                    <div className="site-shell">
                        <a className="skip-link" href="#main-content">
                            К содержимому
                        </a>
                        <Header />
                        <main id="main-content" className="site-content">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </Providers>
                <Toast.Provider placement="bottom end" style={{ zIndex: 99999 }} />
            </body>
        </html>
    )
}
