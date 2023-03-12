import { StarRating } from '@/entities/StarRating'
import { ProductProps } from '@/shared/api'
import { HeartIcon } from '@/_pages/ProductPage/product/svg/HeardIcon'
import { Card, Col, Grid, Row, Image, Text, Button, Tooltip, Badge } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import router from 'next/router'
import { FC } from 'react'

const Content: FC<{ product: ProductProps[] }> = ({ product }) => {
    const router = useRouter()
    return (
        <Grid.Container css={{ gap: '$10' }} alignContent="flex-start">
            {product.map((prod) => (
                <Grid xs={12} key={prod._id} css={{ maxHeight: '180px' }}>
                    <Card
                        isPressable
                        isHoverable
                        onClick={() => router.push(`product/${prod.slug}`)}
                    >
                        <Row align="center" css={{ p: '$5', gap: '$10' }}>
                            <Col span={3}>
                                <Image
                                    css={{ d: 'block', borderRadius: '$2xl' }}
                                    showSkeleton
                                    objectFit="cover"
                                    src={prod.img}
                                    alt="Default Image"
                                    height={150}
                                />
                            </Col>
                            <Col span={6}>
                                <Text css={{ mb: '$5' }}>{prod.name}</Text>
                                <Badge size="lg" isSquared color="warning" variant="bordered">
                                    <StarRating readOnly tooltip defaultState={prod.rating} />
                                </Badge>
                            </Col>
                            <Col span={3}>
                                <Row wrap="wrap" justify="center">
                                    <Col>
                                        <Text size="$2xl" css={{ textAlign: 'center', mb: '$5' }}>
                                            {prod.price} руб
                                        </Text>
                                    </Col>
                                    <Col css={{ dflex: 'center', gap: '$5' }}>
                                        <Tooltip content={'Добавить в избранное'}>
                                            <Button
                                                auto
                                                color="error"
                                                icon={<HeartIcon fill="currentColor" filled />}
                                            />
                                        </Tooltip>
                                        <Button auto>Купить</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Grid>
            ))}
        </Grid.Container>
    )
}

export default Content
