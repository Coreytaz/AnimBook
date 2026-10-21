import { Avatar, Dropdown, Tooltip } from '@/shared/ui-kit'
import { Label, Separator } from '@heroui/react'
import { LogOut, User } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { TOPIC_BUY, TOPIC_DELIVERY } from '../config'

const Profile = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const onActionItemsMenu = (key: string | number) => {
        if (key === '$logout') {
            void signOut()
            return
        }
        router.push(`/${key}`)
    }
    return session?.user ? (
        <Dropdown>
            <Dropdown.Trigger aria-label="Меню профиля" className="rounded-full">
                <Avatar bordered color="primary" size="md" text={session.user.username!} />
            </Dropdown.Trigger>
            <Dropdown.Menu aria-label="Профиль" onAction={onActionItemsMenu}>
                <Dropdown.Item id="profile" textValue="Профиль">
                    <User />
                    <Label>Профиль</Label>
                </Dropdown.Item>
                <Dropdown.Item id={`profile#${TOPIC_DELIVERY.id}`} textValue={TOPIC_DELIVERY.title}>
                    <TOPIC_DELIVERY.icon />
                    <Label>{TOPIC_DELIVERY.title}</Label>
                </Dropdown.Item>
                <Dropdown.Item id={`profile#${TOPIC_BUY.id}`} textValue={TOPIC_BUY.title}>
                    <TOPIC_BUY.icon />
                    <Label>{TOPIC_BUY.title}</Label>
                </Dropdown.Item>
                <Separator />
                <Dropdown.Item id="$logout" textValue="Выйти" variant="danger">
                    <LogOut />
                    <Label>Выйти</Label>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    ) : (
        <Tooltip content="Войти в аккаунт AnimBook" placement="bottom">
            <Avatar
                onClick={() => signIn()}
                bordered
                as="button"
                size="md"
                text="Войти"
                icon={<User />}
            />
        </Tooltip>
    )
}
export default Profile
