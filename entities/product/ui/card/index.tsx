import { StarRating } from '@/entities/StarRating'
import { toRub } from '@/shared'
import { ProductProps } from '@/shared/api'
import { Badge, Card, CardProps, Col, Image, Row, Text } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { FC, ReactNode, useMemo } from 'react'

type Props = {
    data: ProductProps
    className?: string
    actions?: ReactNode
} & Omit<CardProps, 'children'>

export const ProductGridCard: FC<Props> = (props) => {
    const { data, actions } = props
    const totalRating = useMemo(
        () => data.rating?.reduce((acc, cur) => acc + cur.rating, 0) / data.rating?.length || 0,
        [data.rating]
    )
    return (
        <>
            <Card.Header>
                <Image
                    css={{ d: 'block', borderRadius: '$2xl' }}
                    showSkeleton
                    objectFit="cover"
                    src={data.img[0].src}
                    alt={data.img[0].alt}
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
                                rating={totalRating}
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
            {...props}
        >
            <ProductGridCard {...props} />
        </Card>
    )
}

export default ProductCard
