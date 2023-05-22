'use client'
import { Container, Text } from '@nextui-org/react'
import Link from 'next/link'
import React, { FC } from 'react'
import { Content } from './content'

const CheckoutPage: FC = () => {
    return (
        <Container lg>
            <Text span>
                <Link href="/cart">Вернуться к корзине</Link>
            </Text>
            <Text h2>Оформление заказа</Text>
            <Content />
        </Container>
    )
}

export default CheckoutPage
