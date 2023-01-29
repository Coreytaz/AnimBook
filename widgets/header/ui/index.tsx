import { Button, changeTheme, Navbar, Text, useTheme } from '@nextui-org/react'
import styles from './styles.module.scss'
import cn from 'classnames'
import { FC } from 'react'

interface HeaderProps {
    className?: string
}

const Header: FC<HeaderProps> = ({ className }) => {
    const { type, isDark } = useTheme()

    const handleChange = () => {
        const nextTheme = isDark ? 'light' : 'dark'
        window.localStorage.setItem('data-theme', nextTheme) // you can use any storage
        changeTheme(nextTheme)
    }

    return (
        <Navbar isBordered variant="floating" className={cn(styles.root, className)}>
            <Navbar.Brand>
                <Text b color="inherit" hideIn="xs">
                    Techmarket
                </Text>
            </Navbar.Brand>
            <Navbar.Content hideIn="xs" activeColor="primary" variant="underline-rounded">
                <Navbar.Link href="#">Features</Navbar.Link>
                <Navbar.Link isActive href="#">
                    Customers
                </Navbar.Link>
                <Navbar.Link href="#">Pricing</Navbar.Link>
                <Navbar.Link href="#">Company</Navbar.Link>
            </Navbar.Content>
            <Navbar.Content>
                <Navbar.Link color="inherit" href="#">
                    Login
                </Navbar.Link>
                <Navbar.Item>
                    <Button auto flat href="#" onClick={() => handleChange()}>
                        Sign Up
                    </Button>
                </Navbar.Item>
            </Navbar.Content>
        </Navbar>
    )
}

export default Header
