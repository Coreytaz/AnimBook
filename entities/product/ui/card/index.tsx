import { StarRating } from '@/entities/StarRating'
import { toRub } from '@/shared'
import { ProductProps } from '@/shared/api'
import { Badge, Card, Col, Grid, Image, Row, Text } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { FC, ReactNode } from 'react'

type Props = {
    data: ProductProps
    className?: string
    actions?: ReactNode
}

export const ProductGridCard: FC<Props> = (props) => {
    const { data, actions } = props
    return (
        <>
            <Card.Header>
                <Image
                    css={{ d: 'block', borderRadius: '$2xl' }}
                    showSkeleton
                    objectFit="cover"
                    src={data.img}
                    alt="Default Image"
                    height={200}
                />
            </Card.Header>
            <Card.Body css={{ pb: '$5' }}>
                <Row wrap="wrap">
                    <Text css={{ h: '80px', overflow: 'scroll' }}>{data.name}</Text>
                    <Col css={{ d: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Text size="$2xl" css={{ textAlign: 'center', mb: '$5' }}>
                            {toRub.format(data.price)}
                        </Text>
                        <Badge size="md" isSquared color="warning" variant="bordered">
                            <StarRating
                                readOnly
                                tooltip
                                defaultState={data.rating}
                                width={15}
                                height={15}
                            />
                        </Badge>
                    </Col>
                </Row>
            </Card.Body>
            {actions ? (
                <>
                    <Card.Divider />
                    <Card.Footer>
                        <Row>
                            <Col css={{ dflex: 'center' }}>{actions}</Col>
                        </Row>
                    </Card.Footer>
                </>
            ) : null}
        </>
    )
}

const ProductCard: FC<Props> = (props) => {
    const router = useRouter()
    const { data, className } = props
    return (
        <Card
            isPressable
            isHoverable
            onClick={() => router.push(`product/${data.slug}`)}
            className={className}
        >
            <ProductGridCard {...props} />
        </Card>
    )
}

export default ProductCard
