'use client'
import { BadgeStatus } from '@/entities/BadgeStatus'
import { ProductGridCard } from '@/entities/product'
import { useScrollVertical } from '@/shared/helpers'
import { Skeleton } from '@/shared/ui'
import { Badge, Card, Col, Container, Grid, Loading, Row, Text } from '@nextui-org/react'
import { useParams } from 'next/navigation'
import React from 'react'
import { getOrderiesApi } from './api'

const OrderInfoPage = () => {
    const scrollVerticalRef = useScrollVertical()
    const params = useParams()
    const { data: order, isLoading } = getOrderiesApi.useGetOrderStatusQuery(
        params?.orderId.toString()!
    )

    if (isLoading) {
        return (
            <Container lg>
                <Grid.Container gap={2} justify="center">
                    <Grid xs={12} css={{ gap: '$5' }}>
                        <Skeleton style={{ width: '50%', height: '40px' }} />
                    </Grid>
                    <Grid xs={12} sm={4} alignItems="flex-start">
                        <Skeleton style={{ width: '100%', height: '200px' }} />
                    </Grid>
                    <Grid xs={12} sm={8}>
                        <Skeleton style={{ width: '100%', height: '500px' }} />
                    </Grid>
                </Grid.Container>
            </Container>
        )
    }

    return (
        <Container lg>
            <Grid.Container gap={2} justify="center">
                <Grid xs={12} css={{ gap: '$5' }}>
                    <Text size="$3xl">
                        Заказа №
                        <Text b size="$2xl">
                            {order?._id}
                        </Text>
                    </Text>
                    <BadgeStatus text={order?.status!} />
                </Grid>
                <Grid xs={12} sm={4} alignItems="flex-start">
                    <Card>
                        <Card.Body>
                            <Text b>
                                Адрес:<Text>{order?.address}</Text>
                            </Text>
                            <Text b>
                                Почтовый индекс:<Text>{order?.postIndex}</Text>
                            </Text>
                            <Text b>
                                Квартира:<Text>{order?.apartaments}.кв</Text>
                            </Text>
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={12} sm={8}>
                    <Card
                        css={{
                            p: '$14',
                            pt: '$10',
                            br: '$2xl',
                        }}
                    >
                        <Row justify="space-between">
                            <Text h3>Ваши товары</Text>
                        </Row>
                        <div ref={scrollVerticalRef} style={{ display: 'flex', gap: '15px' }}>
                            {order?.items.map((item) => (
                                <Col css={{ width: '242px' }} key={item._id}>
                                    <ProductGridCard
                                        data={item.product}
                                        css={{
                                            filter: 'none',
                                            background: '$gray100',
                                        }}
                                    />
                                </Col>
                            ))}
                        </div>
                    </Card>
                </Grid>
            </Grid.Container>
        </Container>
    )
}

export default OrderInfoPage
