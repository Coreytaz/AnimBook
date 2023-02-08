import { Navbar, Text } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { Logo } from './svg/Logo'
import Search from './search'
import Profile from './Profile'
import Link from 'next/link'

interface HeaderProps {
    className?: string
}

const Header: FC<HeaderProps> = () => {
    const pathname = usePathname()
    return (
        <Navbar isBordered variant="floating">
            <Navbar.Brand>
                <Text b color="inherit" hideIn="xs" size="$2xl">
                    <Link href="/" style={{ fontSize: 'inherit' }}>
                        <Logo height={20} width={20} />
                        AnimBook
                    </Link>
                </Text>
            </Navbar.Brand>
            <Navbar.Content
                css={{
                    '@xs': {
                        width: '50%',
                    },
                }}
            >
                <Search />
            </Navbar.Content>
            <Navbar.Content hideIn="xs" activeColor="primary" variant="underline-rounded">
                <Navbar.Link as={Link} isActive={pathname === '/catalog'} href="/catalog">
                    Каталог
                </Navbar.Link>
                <Navbar.Link as={Link} isActive={pathname === '/cart'} href="/cart">
                    Корзина
                </Navbar.Link>
                <Profile />
            </Navbar.Content>
        </Navbar>
    )
}

export default Header
