'use client'

import { useEffect } from 'react'
import { Provider } from 'react-redux'
import store, { persistor } from './GlobalRedux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { SessionProvider } from 'next-auth/react'

const Providers = ({
    children,
    isDark,
}: {
    children: React.ReactNode
    isDark: boolean | undefined
}) => {
    useEffect(() => {
        const dark = isDark ?? window.localStorage.getItem('data-theme') === 'dark'
        document.documentElement.classList.toggle('dark', dark)
        document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    }, [isDark])
    return (
        <SessionProvider>
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={null}>
                    {children}
                </PersistGate>
            </Provider>
        </SessionProvider>
    )
}

export default Providers
