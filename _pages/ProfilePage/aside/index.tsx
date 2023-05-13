import { Avatar, Button, Card, Input, Spacer, Text } from '@nextui-org/react'
import { User } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

const Aside = () => {
    const [isEdit, setIsEdit] = useState(false)
    const { data: session }: any = useSession()

    return (
        <Card
            css={{ mw: '400px', position: 'sticky', left: 0, top: '$24', minWidth: '300px' }}
            variant="bordered"
        >
            <Card.Header
                css={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '$5',
                }}
            >
                <Avatar css={{ size: '$40' }} icon={<User size={128} />} />
                <Input
                    size="lg"
                    underlined
                    initialValue={session?.user.username}
                    color="primary"
                    disabled={!isEdit}
                    css={{ width: '100%' }}
                />
            </Card.Header>
            <Card.Divider />
            <Card.Body>
                <Spacer y={1} />
                <Input
                    underlined
                    labelPlaceholder="Почта"
                    type="email"
                    initialValue={session?.user.email}
                    color="primary"
                    disabled={!isEdit}
                />
                <Spacer y={2.5} />
                <Input
                    underlined
                    labelPlaceholder="Номер телефона"
                    type="tel"
                    initialValue={session?.user.phone}
                    color="primary"
                    disabled={!isEdit}
                />
                <Spacer y={2.5} />
                <Input
                    underlined
                    type="text"
                    labelPlaceholder="Адрес"
                    initialValue={session?.user.address}
                    color="primary"
                    disabled={!isEdit}
                />
            </Card.Body>
            <Card.Divider />
            <Card.Footer css={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={() => setIsEdit(!isEdit)}>Редактировать</Button>
            </Card.Footer>
        </Card>
    )
}

export default Aside
