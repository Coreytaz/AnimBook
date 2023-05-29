import { StarRating } from '@/entities/StarRating'
import { Grid, Button, Tooltip, Badge, Spacer, Row, Checkbox, Text } from '@nextui-org/react'
import { signIn, useSession } from 'next-auth/react'
import { useState, FC } from 'react'
import ReviewModal from '../modal'

const ReviewsHead: FC<{ rating: number; quantityReviews: number; slug: string }> = ({
    rating,
    quantityReviews,
    slug,
}) => {
    const { data: session } = useSession()
    const [visible, setVisible] = useState<boolean>(false)
    const handler = () => {
        if (session?.user) {
            setVisible(true)
        } else {
            signIn()
        }
    }
    return (
        <>
            <Grid.Container gap={2}>
                <Grid xs css={{ gap: '$10', alignItems: 'center' }}>
                    <Button color="primary" auto shadow onPress={handler}>
                        Добавить отзыв
                    </Button>
                    <Tooltip content={`Рейтинг товара: ${rating}`}>
                        <Badge
                            size="lg"
                            isSquared
                            color="warning"
                            variant="bordered"
                            css={{ gap: '$2' }}
                        >
                            <Text>Общий рейтинг:</Text>
                            <StarRating readOnly rating={rating} />
                        </Badge>
                    </Tooltip>
                </Grid>
                <Grid xs>
                    <Spacer />
                </Grid>
            </Grid.Container>
            <Spacer y={1} />
            {quantityReviews > 0 ? (
                <>
                    <Row justify="space-between">
                        <Text h3>
                            Отзывы: <span>{quantityReviews}</span>
                        </Text>
                    </Row>
                    <Grid.Container gap={2}>
                        {[...new Array(5)]
                            .map((_, i) => (
                                <Grid xs key={i + 1}>
                                    <Badge
                                        size="lg"
                                        isSquared
                                        color="warning"
                                        variant="bordered"
                                        css={{ gap: '$2' }}
                                    >
                                        <Checkbox color="primary">
                                            <StarRating readOnly maxValue={i + 1} rating={0} />
                                            <Text css={{ ml: '$5' }}>{i + 1}</Text>
                                        </Checkbox>
                                    </Badge>
                                </Grid>
                            ))
                            .reverse()}
                        <Grid xs={4}>
                            <Spacer />
                        </Grid>
                    </Grid.Container>
                </>
            ) : null}
            <ReviewModal slug={slug} visible={visible} setVisible={setVisible} />
        </>
    )
}

export default ReviewsHead
