import { useActionOrder, useOrder, useTotalCart } from '@/entities/cart'
import { ProductGridCard } from '@/entities/product'
import { toRub, useScrollVertical } from '@/shared/helpers'
import { Card, Button, Text, Col } from '@/shared/ui-kit'
import router from 'next/router'
import React, { useEffect } from 'react'
import { Section } from '../section'

export const YourOrder = () => {
    const scrollVerticalRef = useScrollVertical()
    const { getOrderProduct } = useActionOrder()
    const { products, cartOrder, price } = useOrder()
    const carTotal = useTotalCart()

    useEffect(() => {
        getOrderProduct()
    }, [cartOrder, getOrderProduct])

    return (
        <Section
            isLoading={products.status === 'loading'}
            title="Ваш заказ"
            descriptions={`Оформляем ${carTotal} товара за ${toRub.format(price)}`}
            ref={scrollVerticalRef}
        >
            {products.orderProduct.length > 0 ? (
                products.orderProduct.map((prod) => (
                    <Col
                        key={prod._id}
                        css={{
                            position: 'relative',
                            width: '242px',
                        }}
                    >
                        <ProductGridCard
                            data={prod}
                            css={{
                                filter: 'none',
                                background: '$gray100',
                            }}
                        />
                    </Col>
                ))
            ) : (
                <>
                    <Card.Body>
                        <Text h3 css={{ textAlign: 'center' }}>
                            Заказ пустой 😔
                        </Text>
                    </Card.Body>
                    <Card.Footer css={{ gap: '$5', display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={() => router.push('/')}>На главную</Button>
                        <Button onClick={() => router.push('/catalog')}>В каталог</Button>
                    </Card.Footer>
                </>
            )}
        </Section>
    )
}
