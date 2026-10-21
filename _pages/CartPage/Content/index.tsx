import { CartSkeleton, useActionOrder, useOrder } from '@/entities/cart'
import { ProductRowCard } from '@/entities/product'
import { Cart } from '@/features/cart'
import { Button, Card, Grid, Text } from '@/shared/ui-kit'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Content = () => {
    const { getOrderProduct } = useActionOrder()
    const { products, cartOrder } = useOrder()
    const router = useRouter()

    useEffect(() => {
        getOrderProduct()
    }, [cartOrder, getOrderProduct])

    if (products.status === 'loading') {
        return <CartSkeleton />
    }

    return (
        <>
            <Text h2>Корзина</Text>
            <section>
                <Text h3>Содержимое заказа</Text>
                <Text css={{ mb: '$10' }}>Проверьте выбранные товар перед оформлением</Text>
                <Grid.Container css={{ gap: '$10' }} alignContent="flex-start">
                    {products.orderProduct.length > 0 ? (
                        products.orderProduct.map((prod) => (
                            <ProductRowCard
                                data={prod}
                                key={prod._id}
                                actions={
                                    <>
                                        <Cart.Actions.DeleteProduct productId={prod._id} />
                                        <Cart.Actions.Counter productId={prod._id} />
                                    </>
                                }
                            />
                        ))
                    ) : (
                        <Card css={{ mw: '100%' }}>
                            <Card.Body>
                                <Text h3 css={{ textAlign: 'center' }}>
                                    Корзина пуста 😔
                                </Text>
                            </Card.Body>
                            <Card.Footer
                                css={{ gap: '$5', display: 'flex', justifyContent: 'center' }}
                            >
                                <Button onClick={() => router.push('/')}>На главную</Button>
                                <Button onClick={() => router.push('/catalog')}>В каталог</Button>
                            </Card.Footer>
                        </Card>
                    )}
                </Grid.Container>
            </section>
        </>
    )
}

export default Content
