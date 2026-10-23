import { Button, Description, Dropdown, Label, Separator } from '@heroui/react'
import { ChevronRight, LogOut, User } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { TOPIC_BUY, TOPIC_DELIVERY } from '../config'
import styles from './styles.module.css'

const links = [
    { id: 'profile', title: 'Профиль', description: 'Личные данные', Icon: User },
    {
        id: `profile#${TOPIC_DELIVERY.id}`,
        title: TOPIC_DELIVERY.title,
        description: 'Заказы в пути',
        Icon: TOPIC_DELIVERY.icon,
    },
    {
        id: `profile#${TOPIC_BUY.id}`,
        title: TOPIC_BUY.title,
        description: 'История ваших заказов',
        Icon: TOPIC_BUY.icon,
    },
]

export default function Profile() {
    const { data: session } = useSession()
    const router = useRouter()
    const pathname = usePathname() || '/'
    const active = pathname.startsWith('/profile') || pathname === '/auth'
    const name = session?.user?.username?.trim() || 'Читатель AnimBook'
    const initials = name
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()

    return session?.user ? (
        <Dropdown>
            <Dropdown.Trigger
                aria-label="Меню профиля"
                className="header-action header-login"
                data-active={active || undefined}
            >
                <User size={21} aria-hidden="true" />
                <span>Профиль</span>
            </Dropdown.Trigger>
            <Dropdown.Popover placement="bottom end" offset={12} className={styles.popover}>
                <div className={styles.identity}>
                    <span className={styles.avatar} aria-hidden="true">
                        {initials}
                    </span>
                    <div className={styles.user}>
                        <span className={styles.caption}>Личный кабинет</span>
                        <strong>{name}</strong>
                        {session.user.email && (
                            <span className={styles.email}>{session.user.email}</span>
                        )}
                    </div>
                </div>
                <Separator className={styles.separator} />
                <Dropdown.Menu
                    className={styles.menu}
                    aria-label="Меню аккаунта"
                    onAction={(key) => {
                        if (key === '$logout') void signOut()
                        else router.push(`/${key}`)
                    }}
                >
                    {links.map(({ id, title, description, Icon }) => (
                        <Dropdown.Item id={id} key={id} textValue={title} className={styles.item}>
                            <span className={styles.itemIcon}>
                                <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
                            </span>
                            <div className={styles.text}>
                                <Label className={styles.label}>{title}</Label>
                                <Description className={styles.description}>
                                    {description}
                                </Description>
                            </div>
                            <ChevronRight size={15} className={styles.chevron} aria-hidden="true" />
                        </Dropdown.Item>
                    ))}
                    <Separator className={styles.separator} />
                    <Dropdown.Item
                        id="$logout"
                        textValue="Выйти из аккаунта"
                        variant="danger"
                        className={`${styles.item} ${styles.logout}`}
                    >
                        <span className={styles.itemIcon}>
                            <LogOut size={18} strokeWidth={1.7} aria-hidden="true" />
                        </span>
                        <Label className={styles.label}>Выйти из аккаунта</Label>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    ) : (
        <Button
            variant="ghost"
            className="header-action header-login"
            data-active={active || undefined}
            aria-label="Войти в аккаунт AnimBook"
            onPress={() => signIn()}
        >
            <User size={21} aria-hidden="true" />
            <span>Войти</span>
        </Button>
    )
}
