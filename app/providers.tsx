'use client'

import { createTheme, NextUIProvider } from '@nextui-org/react'

const lightTheme = createTheme({
    type: 'light',
})

const darkTheme = createTheme({
    type: 'dark',
})
const Providers = ({
    children,
    isDark,
}: {
    children: React.ReactNode
    isDark: boolean | undefined
}) => {
    return <NextUIProvider theme={isDark ? darkTheme : lightTheme}>{children}</NextUIProvider>
}

export default Providers
