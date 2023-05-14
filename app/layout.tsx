'use client'
import { useTheme } from '@/shared'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { Container, Spacer } from '@nextui-org/react'
import { ToastContainer } from 'react-toastify'
import './globals.scss'
import 'react-toastify/dist/ReactToastify.css'
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
                        <Spacer y={1} />
                        <Container
                            gap={0}
                            className="content"
                            css={{
                                flex: 1,
                                '@xs': {
                                    maxWidth: '$breakpoints-md',
                                },
                            }}
                        >
                            {children}
                        </Container>
                        <Spacer y={1} />
                        <Footer />
                    </div>
                </Providers>
                <ToastContainer position="bottom-right" theme={isDark ? 'dark' : 'light'} />
            </body>
        </html>
    )
}
