'use client'

import { createTheme, NextUIProvider } from '@nextui-org/react'
import { Provider } from 'react-redux'
import store from './GlobalRedux/store'

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
    return (
        <Provider store={store}>
            <NextUIProvider theme={isDark ? darkTheme : lightTheme}>{children}</NextUIProvider>
        </Provider>
    )
}

export default Providers
