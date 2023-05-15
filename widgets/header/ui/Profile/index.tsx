import { Avatar, Dropdown, Navbar, Text, Tooltip } from '@nextui-org/react'
import { Heart, LogOut, User } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Key } from 'react'
import { TOPIC_BUY, TOPIC_DELIVERY } from '../config'

const Profile = () => {
    const { data: session } = useSession()
    const router = useRouter()
    //FIXME
    const onActionItemsMenu = (key: Key) => {
        if (key.toString().includes('$')) {
            return
        }
        router.push(`/${key}`)
    }

    return (
        <>
            {session?.user ? (
                <Dropdown placement="bottom-right">
                    <Navbar.Item>
                        <Dropdown.Trigger>
                            <Avatar
                                bordered
                                as="button"
                                color="primary"
                                size="md"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
                        </Dropdown.Trigger>
                    </Navbar.Item>
                    <Dropdown.Menu color="primary" onAction={(e) => onActionItemsMenu(e)}>
                        <Dropdown.Item key="profile" icon={<User />}>
                            Профиль
                        </Dropdown.Item>
                        <Dropdown.Item withDivider key="fav" icon={<Heart />}>
                            Избранное
                        </Dropdown.Item>
                        <Dropdown.Item
                            key={`profile#${TOPIC_DELIVERY.id}`}
                            icon={<TOPIC_DELIVERY.icon />}
                        >
                            {TOPIC_DELIVERY.title}
                        </Dropdown.Item>
                        <Dropdown.Item key={`profile#${TOPIC_BUY.id}`} icon={<TOPIC_BUY.icon />}>
                            {TOPIC_BUY.title}
                        </Dropdown.Item>
                        <Dropdown.Item withDivider color="error" icon={<LogOut />}>
                            <Text color="error" onClick={() => signOut()}>
                                Выйти
                            </Text>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            ) : (
                <Tooltip content={'Войти в аккаунт AnimBook'} placement="bottom">
                    <Avatar
                        onClick={() => signIn()}
                        bordered
                        as="button"
                        size="md"
                        text="Войти"
                        icon={<User />}
                    />
                </Tooltip>
            )}
        </>
    )
}

export default Profile
