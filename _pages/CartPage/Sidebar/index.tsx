import { useOrder } from '@/entities/cart'
import { toRub } from '@/shared'
import { Button, Card, Text } from '@nextui-org/react'
import React from 'react'

const Sidebar = () => {
    const { price } = useOrder()
    return (
        <Card css={{ mw: '350px' }}>
            <Card.Body
                css={{
                    display: 'flex',
                    flexFlow: 'nowrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Text css={{ display: 'block' }}>Итого</Text>
                <Text b css={{ display: 'block' }}>
                    {toRub.format(price)}
                </Text>
            </Card.Body>
            <Card.Divider />
            <Card.Footer css={{ justifyContent: 'center' }}>
                <Button>Перейти к оформлению</Button>
            </Card.Footer>
        </Card>
    )
}

export default Sidebar
