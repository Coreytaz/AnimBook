import { FC } from 'react'
import { changeTheme, Switch, Text, useTheme } from '@nextui-org/react'
import Link from 'next/link'
import { Moon, Sun } from 'lucide-react'

const Footer: FC = () => {
    const { isDark, theme } = useTheme()

    const handleChange = () => {
        const nextTheme = isDark ? 'light' : 'dark'
        window.localStorage.setItem('data-theme', nextTheme)
        changeTheme(nextTheme)
    }

    return (
        <footer
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: `${theme?.colors.border}`,
                padding: `${theme?.space[5]}`,
                gap: `0 ${theme?.space[5]}`,
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
                onChange={handleChange}
                checked={true}
                size="md"
                iconOn={<Sun />}
                iconOff={<Moon />}
            />
        </footer>
    )
}

export default Footer
