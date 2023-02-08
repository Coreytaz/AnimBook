'use client'
import { useTheme } from '@/shared'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { Container, Grid, Spacer } from '@nextui-org/react'
import './globals.scss'
import Providers from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { isDark } = useTheme()

    return (
        <html lang="ru">
            <head />
            <body>
                <Providers isDark={isDark}>
                    <div className="container">
                        <Header />
                        <Spacer y={2} />
                        <Container className="content">{children}</Container>
                        <Spacer y={2} />
                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    )
}
