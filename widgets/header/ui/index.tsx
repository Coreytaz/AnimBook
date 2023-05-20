import { Badge, Navbar, Text } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import Search from './search'
import Profile from './Profile'
import Link from 'next/link'
import styles from './styles.module.scss'
import { Book, Heart, LayoutGrid, ShoppingCart } from 'lucide-react'
import { useTotalFav } from '@/entities/fav'
import { useTotalCart } from '@/entities/cart'

interface HeaderProps {
    className?: string
}

const actions = [
    {
        id: 'catalog' as const,
        label: 'Каталог',
        Icon: LayoutGrid,
        url: 'catalog',
        disabled: false,
    },
    {
        id: 'fav' as const,
        label: 'Избранное',
        Icon: Heart,
        url: 'fav',
        disabled: false,
    },
    {
        id: 'cart' as const,
        label: 'Корзина',
        Icon: ShoppingCart,
        url: 'cart',
        disabled: false,
    },
]

type ActionId = (typeof actions)[number]['id']

const Header: FC<HeaderProps> = () => {
    const pathname = usePathname()
    const favTotal = useTotalFav()
    const carTotal = useTotalCart()

    const count: Record<ActionId, number> = {
        cart: carTotal,
        fav: favTotal,
        catalog: 0,
    }

    return (
        <Navbar disableScrollHandler isBordered variant="floating">
            <Navbar.Brand>
                <Text b color="inherit" hideIn="xs" size="$2xl">
                    <Link href="/" style={{ fontSize: 'inherit' }} className={styles.logo}>
                        <Book height={20} width={20} />
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
                {actions.map(({ id, label, Icon, url }) => (
                    <Navbar.Link
                        key={label}
                        as={Link}
                        isActive={new RegExp(`\\b${url}\\b`).test(pathname!)}
                        href={url}
                        css={{ d: 'flex', fd: 'column', jc: 'center' }}
                    >
                        <Badge content={count[id]} isInvisible={count[id] === 0} color="primary">
                            <Icon />
                        </Badge>
                        {label}
                    </Navbar.Link>
                ))}
                <Profile />
            </Navbar.Content>
        </Navbar>
    )
}

export default Header
