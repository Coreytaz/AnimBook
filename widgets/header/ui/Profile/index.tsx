import { Avatar, Dropdown, Navbar, Text } from '@nextui-org/react'
import React from 'react'

const Profile = () => {
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
            <Dropdown.Menu color="primary">
                <Dropdown.Item key="profile" css={{ height: '$18' }}>
                    <Text b color="inherit" css={{ d: 'flex' }}>
                        Signed in as
                    </Text>
                    <Text b color="inherit" css={{ d: 'flex' }}>
                        zoey@example.com
                    </Text>
                </Dropdown.Item>
                <Dropdown.Item withDivider>My Settings</Dropdown.Item>
                <Dropdown.Item>Team Settings</Dropdown.Item>
                <Dropdown.Item withDivider>Analytics</Dropdown.Item>
                <Dropdown.Item>System</Dropdown.Item>
                <Dropdown.Item>Configurations</Dropdown.Item>
                <Dropdown.Item withDivider>Help & Feedback</Dropdown.Item>
                <Dropdown.Item withDivider color="error">
                    Log Out
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Profile
