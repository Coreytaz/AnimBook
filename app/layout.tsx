'use client'
import { useTheme } from '@/shared/hooks'
import { Header } from '@/widgets/header'
import { Container, createTheme, Grid, Loading, NextUIProvider, Spacer } from '@nextui-org/react'
import { Suspense } from 'react'
import './globals.scss'

const lightTheme = createTheme({
    type: 'light',
})

const darkTheme = createTheme({
    type: 'dark',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { isDark } = useTheme()
    return (
        <html lang="ru">
            <head />
            <body>
                <Suspense fallback={<Loading type="gradient" />}>
                    <NextUIProvider theme={isDark ? darkTheme : lightTheme}>
                        <Grid.Container
                            className="layout"
                            justify="center"
                            alignContent="space-between"
                        >
                            <Grid xs={12}>
                                <Header />
                            </Grid>
                            <Grid xs={12}>
                                <Container>{children}</Container>
                            </Grid>
                            <Grid xs={12} css={{ backgroundColor: '$colors$primary' }}>
                                <Spacer y={2} />
                            </Grid>
                        </Grid.Container>
                    </NextUIProvider>
                </Suspense>
            </body>
        </html>
    )
}
