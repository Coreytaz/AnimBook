import { StarRating } from '@/entities/StarRating'
import {
    Grid,
    Button,
    Tooltip,
    Badge,
    Spacer,
    Row,
    Dropdown,
    Checkbox,
    Text,
} from '@nextui-org/react'
import { useState, useMemo, FC } from 'react'
import ReviewModal from '../modal'

const menuItems = [
    { key: 'date', name: 'По дате' },
    { key: 'rating', name: 'По рейтингу' },
    { key: 'papular', name: 'По популярности' },
    { key: 'change', name: 'По дате изменения' },
]

const ReviewsHead: FC<{ rating: number; quantityReviews: number }> = ({
    rating,
    quantityReviews,
}) => {
    const [visible, setVisible] = useState<boolean>(false)
    const handler = () => setVisible(true)
    const [selected, setSelected] = useState(new Set(['date']))
    const selectedValue = useMemo(
        () => Array.from(selected).join(', ').replaceAll('_', ' '),
        [selected]
    )
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
                            <StarRating readOnly defaultState={rating} />
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
                        <Dropdown placement="left-top">
                            <Dropdown.Button shadow>
                                {menuItems.filter((item) => item.key === selectedValue)[0].name}
                            </Dropdown.Button>
                            <Dropdown.Menu
                                css={{ background: '$gray100' }}
                                aria-label="Single selection actions"
                                color="primary"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selected}
                                onSelectionChange={setSelected as any}
                                items={menuItems}
                            >
                                {(item: any) => (
                                    <Dropdown.Item key={item.key}>{item.name}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
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
                                            <StarRating
                                                readOnly
                                                maxValue={i + 1}
                                                defaultState={0}
                                            />
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
            <ReviewModal visible={visible} setVisible={setVisible} />
        </>
    )
}

export default ReviewsHead
