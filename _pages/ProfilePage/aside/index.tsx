import { Avatar, Button, Card, Text } from '@nextui-org/react'
import { User } from 'lucide-react'
import React, { useState } from 'react'

const Aside = () => {
    const [isEdit, setIsEdit] = useState(false)

    return (
        <Card css={{ mw: '400px', position: 'sticky', left: 0, top: '$24' }} variant="bordered">
            <Card.Header
                css={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '$5',
                }}
            >
                <Avatar css={{ size: '$40' }} icon={<User size={128} />} />
                <Text h3>Иванов Иван Иваныч </Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body>
                <Text>
                    Почта: <Text b>example@gmail.com</Text>
                </Text>
                <Text>
                    Номер телефона: <Text b>+7-999-999-99-99</Text>
                </Text>
                <Text>
                    Адрес: <Text b>Улица Пушкина д.58</Text>
                </Text>
            </Card.Body>
            <Card.Divider />
            <Card.Footer css={{ display: 'flex', justifyContent: 'center' }}>
                <Button>Редактировать</Button>
            </Card.Footer>
        </Card>
    )
}

export default Aside
