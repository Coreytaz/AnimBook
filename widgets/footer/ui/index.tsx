import { FC } from 'react'
import useTheme from '@/shared/hooks/useTheme'
import { Switch, Text } from '@/shared/ui-kit'
import Link from 'next/link'
import { Moon, Sun } from 'lucide-react'

const Footer: FC = () => {
    const { isDark } = useTheme()

    const handleChange = () => {
        const nextTheme = isDark ? 'light' : 'dark'
        window.localStorage.setItem('data-theme', nextTheme)
        document.documentElement.dataset.theme = nextTheme
        document.documentElement.classList.toggle('dark', nextTheme === 'dark')
    }

    return (
        <footer
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--animbook-colors-border)',
                padding: '20px',
                gap: '0 20px',
            }}
        >
            <Text b size="$sm" css={{ padding: '$1' }}>
                AnimBook ©2023 Created by{' '}
                <Link href="https://github.com/Coreytaz" target="_blank" rel="noreferrer">
                    Coreytaz
                </Link>
            </Text>
            <Switch
                animated={false}
                onValueChange={handleChange}
                checked={!isDark}
                size="md"
                iconOn={<Sun />}
                iconOff={<Moon />}
            />
        </footer>
    )
}

export default Footer
