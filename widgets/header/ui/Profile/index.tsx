import { Avatar, Dropdown, Navbar } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { Key } from 'react'

const Profile = () => {
    const router = useRouter()
    //FIXME
    const onActionItemsMenu = (key: Key) => {
        if (key.toString().includes('$')) {
            return
        }
        router.push(`/${key}`)
    }
    return (
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
                <Dropdown.Item key="fav">Избранное</Dropdown.Item>
                <Dropdown.Item withDivider color="error">
                    Выйти
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Profile
