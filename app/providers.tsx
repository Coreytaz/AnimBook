'use client'

import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from './GlobalRedux/store'
import { persistStore } from 'redux-persist'
import { SessionProvider } from 'next-auth/react'

const Providers = ({
    children,
    isDark,
}: {
    children: React.ReactNode
    isDark: boolean | undefined
}) => {
    const [store] = useState(makeStore)
    useEffect(() => {
        const persistor = persistStore(store)
        return () => persistor.pause()
    }, [store])
    useEffect(() => {
        const dark = isDark ?? window.localStorage.getItem('data-theme') === 'dark'
        document.documentElement.classList.toggle('dark', dark)
        document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    }, [isDark])
    return (
        <SessionProvider>
            <Provider store={store}>{children}</Provider>
        </SessionProvider>
    )
}

export default Providers
