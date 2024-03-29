'use client'

import { createTheme, NextUIProvider } from '@nextui-org/react'
import { Provider } from 'react-redux'
import store, { persistor } from './GlobalRedux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { SessionProvider } from 'next-auth/react'

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
        <SessionProvider>
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={null}>
                    <NextUIProvider theme={isDark ? darkTheme : lightTheme}>
                        {children}
                    </NextUIProvider>
                </PersistGate>
            </Provider>
        </SessionProvider>
    )
}

export default Providers
