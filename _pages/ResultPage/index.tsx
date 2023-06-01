'use client'
import { useActionCart } from '@/entities/cart'
import { Skeleton } from '@/shared/ui'
import { Button, Container, Row, Spacer, Text } from '@nextui-org/react'
import { CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { FC, useEffect } from 'react'
import { orderApi } from './api'

const ResultPage: FC = () => {
    const params = useParams()
    const router = useRouter()
    const { clearAllCart } = useActionCart()
    const {
        data: items,
        isLoading,
        isError,
        isSuccess,
    } = orderApi.useGetOrderStatusQuery(params?.orderId.toString()!)

    useEffect(() => {
        if (items?.status === 'succeeded' && isSuccess) {
            clearAllCart()
        }
    }, [clearAllCart, isSuccess, items?.status])

    if (isError) {
        return (
            <Container lg>
                <Spacer y={5} />
                <Row align="center" css={{ fd: 'column' }}>
                    <XCircle size={72} />
                    <Text h4>Заказ №{params?.orderId.toString()}</Text>
                    <Text h3>Не удалось найти!</Text>
                </Row>
                <Spacer y={1} />
                <Row align="center" css={{ gap: '$5', fd: 'column' }}>
                    <Button onPress={() => router.push('/catalog')}>В каталог</Button>
                </Row>
            </Container>
        )
    }

    if (isLoading) {
        return (
            <Container lg>
                <Spacer y={5} />
                <Row align="center" css={{ fd: 'column' }}>
                    <Skeleton style={{ width: '5%', height: '72px' }} />
                    <Spacer y={1} />
                    <Skeleton style={{ width: '30%', height: '36px' }} />
                    <Spacer y={1} />
                    <Skeleton style={{ width: '30%', height: '24px' }} />
                </Row>
                <Spacer y={2} />
                <Row align="center" css={{ gap: '$5', fd: 'column' }}>
                    <Skeleton style={{ width: '20%', height: '40px' }} />
                    <Skeleton style={{ width: '20%', height: '40px' }} />
                </Row>
            </Container>
        )
    }

    return (
        <Container lg>
            <Spacer y={5} />
            {items?.status === 'succeeded' ? (
                <>
                    <Row align="center" css={{ fd: 'column' }}>
                        <CheckCircle size={72} />
                        <Text h3>{items.description}</Text>
                        <Text h3>успешно оплачен и оформлен!</Text>
                        <Text span>Ожидайте доставки в течение указанного в заказе времени</Text>
                    </Row>
                    <Spacer y={2} />
                    <Row align="center" css={{ gap: '$5', fd: 'column' }}>
                        <Button onPress={() => router.push('/profile')}>Перейти к заказу</Button>
                        <Button ghost onPress={() => router.push('/catalog')}>
                            В каталог
                        </Button>
                    </Row>
                </>
            ) : null}
            {items?.status === 'pending' ? (
                <>
                    <Row align="center" css={{ fd: 'column' }}>
                        <XCircle size={72} />
                        <Text h4>{items.description}</Text>
                        <Text h3>ожидает оплаты!</Text>
                    </Row>
                    <Spacer y={2} />
                    <Row align="center" css={{ gap: '$5', fd: 'column' }}>
                        <Link href={items.confirmation.confirmation_url}>
                            <Button target="_blank" onPress={() => router.push('/profile')}>
                                Оплатить
                            </Button>
                        </Link>
                        <Button ghost onPress={() => router.push('/catalog')}>
                            В каталог
                        </Button>
                    </Row>
                </>
            ) : null}
        </Container>
    )
}

export default ResultPage
