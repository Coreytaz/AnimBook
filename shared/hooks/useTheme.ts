import { getDocumentTheme } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

const useTheme = (): {
    isDark: boolean | undefined
    setIsDark: React.Dispatch<React.SetStateAction<boolean | undefined>>
} => {
    const [isDark, setIsDark] = useState<boolean>()

    useEffect(() => {
        let theme = window.localStorage.getItem('data-theme')
        setIsDark(theme === 'dark')

        const observer = new MutationObserver((mutation) => {
            let newTheme = getDocumentTheme(document?.documentElement)
            setIsDark(newTheme === 'dark')
        })

        // Observe the document theme changes
        observer.observe(document?.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme', 'style'],
        })

        return () => observer.disconnect()
    }, [])

    return { isDark, setIsDark }
}

export default useTheme
