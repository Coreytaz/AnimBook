import { StarRating } from '@/entities/StarRating'
import { Grid, Button, Tooltip, Badge, Spacer, Row, Checkbox, Text } from '@nextui-org/react'
import { signIn, useSession } from 'next-auth/react'
import { useState, FC, Dispatch, SetStateAction } from 'react'
import ReviewModal from '../modal'

const ReviewsHead: FC<{
    rating: number
    quantityReviews: number
    filtersCounts: { [key: number]: string }
    selected: string[]
    setSelected: Dispatch<SetStateAction<string[]>>
}> = ({ rating, quantityReviews, filtersCounts, selected, setSelected }) => {
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
                    <Checkbox.Group color="secondary" value={selected} onChange={setSelected}>
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
                                            <Checkbox
                                                color="primary"
                                                isDisabled={filtersCounts[i + 1] ? false : true}
                                                value={(i + 1).toString()}
                                            >
                                                <StarRating
                                                    readOnly
                                                    maxValue={i + 1}
                                                    rating={filtersCounts[i + 1] ? i + 1 : 0}
                                                />
                                                <Text css={{ ml: '$5' }}>
                                                    {filtersCounts[i + 1] || 0}
                                                </Text>
                                            </Checkbox>
                                        </Badge>
                                    </Grid>
                                ))
                                .reverse()}
                            <Grid xs={4}>
                                <Spacer />
                            </Grid>
                        </Grid.Container>
                    </Checkbox.Group>
                </>
            ) : null}
            <ReviewModal visible={visible} setVisible={setVisible} />
        </>
    )
}

export default ReviewsHead
