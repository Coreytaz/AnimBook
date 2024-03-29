import { StarRating } from '@/entities/StarRating'
import { toRub } from '@/shared'
import { ProductProps } from '@/shared/api'
import { Badge, Card, Col, Grid, Row, Image, Text } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { FC, ReactNode, useMemo } from 'react'

type Props = {
    data: ProductProps
    className?: string
    actions?: ReactNode
}

const ProductRow: FC<Props> = (props) => {
    const { data, actions, className } = props
    const totalRating = useMemo(
        () => data.rating?.reduce((acc, cur) => acc + cur.rating, 0) / data.rating?.length || 0,
        [data.rating]
    )

    return (
        <Row align="center" css={{ p: '$5', gap: '$10' }} className={className}>
            <Col span={3}>
                <Image
                    css={{ d: 'block', borderRadius: '$2xl' }}
                    showSkeleton
                    objectFit="cover"
                    src={data.img[0].src}
                    alt={data.img[0].alt}
                    height={150}
                />
            </Col>
            <Col span={6}>
                <Text css={{ mb: '$5' }}>{data.name}</Text>
                <Badge size="lg" isSquared color="warning" variant="bordered">
                    <StarRating readOnly tooltip rating={totalRating} />
                </Badge>
            </Col>
            <Col css={{ w: 'auto' }}>
                <Row wrap="wrap" justify="center">
                    <Col>
                        <Text size="$2xl" css={{ textAlign: 'center', mb: '$5' }}>
                            {toRub.format(data.price)}
                        </Text>
                    </Col>
                    <Col css={{ dflex: 'center', gap: '$5' }}>{actions}</Col>
                </Row>
            </Col>
        </Row>
    )
}

export const ProductRowCard: FC<Props> = (props) => {
    const router = useRouter()
    const { data } = props
    return (
        <Grid xs={12} css={{ maxHeight: '200px' }}>
            <Card isPressable isHoverable onClick={() => router.push(`product/${data.slug}`)}>
                <ProductRow {...props} />
            </Card>
        </Grid>
    )
}

export default ProductRow
