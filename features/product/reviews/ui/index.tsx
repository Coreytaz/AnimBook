import { StarRating } from '@/entities/StarRating'
import { Badge, Button, Checkbox, Dropdown, Grid, Spacer, Text, Tooltip } from '@nextui-org/react'
import { FC, useMemo, useState } from 'react'
import Comments from './comments'
import ReviewModal from './modal'

const menuItems = [
    { key: 'date', name: 'По дате' },
    { key: 'rating', name: 'По рейтингу' },
    { key: 'papular', name: 'По популярности' },
    { key: 'change', name: 'По дате изменения' },
]

const Reviews: FC = () => {
    const [visible, setVisible] = useState(false)
    const handler = () => setVisible(true)
    const rating = 4
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
            <Grid.Container gap={2} justify="center">
                <Grid xs={2}>
                    <Text h3>
                        Отзывы: <span>1</span>
                    </Text>
                </Grid>
                <Grid xs={8}>
                    <Spacer />
                </Grid>
                <Grid xs={2} css={{ justifyContent: 'flex-end' }}>
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
                </Grid>
            </Grid.Container>
            <Grid.Container gap={2}>
                <Grid xs>
                    <Badge
                        size="lg"
                        isSquared
                        color="warning"
                        variant="bordered"
                        css={{ gap: '$2' }}
                    >
                        <Checkbox color="primary">
                            <StarRating readOnly maxValue={5} defaultState={0} />
                            <Text css={{ ml: '$5' }}>5</Text>
                        </Checkbox>
                    </Badge>
                </Grid>
                <Grid xs>
                    <Badge
                        size="lg"
                        isSquared
                        color="warning"
                        variant="bordered"
                        css={{ gap: '$2' }}
                    >
                        <Checkbox color="primary">
                            <StarRating readOnly maxValue={4} defaultState={0} />
                            <Text css={{ ml: '$5' }}>4</Text>
                        </Checkbox>
                    </Badge>
                </Grid>
                <Grid xs>
                    <Badge
                        size="lg"
                        isSquared
                        color="warning"
                        variant="bordered"
                        css={{ gap: '$2' }}
                    >
                        <Checkbox color="primary">
                            <StarRating readOnly maxValue={3} defaultState={0} />
                            <Text css={{ ml: '$5' }}>3</Text>
                        </Checkbox>
                    </Badge>
                </Grid>
                <Grid xs>
                    <Badge
                        size="lg"
                        isSquared
                        color="warning"
                        variant="bordered"
                        css={{ gap: '$2' }}
                    >
                        <Checkbox color="primary">
                            <StarRating readOnly maxValue={2} defaultState={0} />
                            <Text css={{ ml: '$5' }}>2</Text>
                        </Checkbox>
                    </Badge>
                </Grid>
                <Grid xs>
                    <Badge
                        size="lg"
                        isSquared
                        color="warning"
                        variant="bordered"
                        css={{ gap: '$2' }}
                    >
                        <Checkbox color="primary">
                            <StarRating readOnly maxValue={1} defaultState={0} />
                            <Text css={{ ml: '$5' }}>1</Text>
                        </Checkbox>
                    </Badge>
                </Grid>
                <Grid xs={4}>
                    <Spacer />
                </Grid>
            </Grid.Container>
            <Spacer
                y={1}
                css={{ borderTop: '4px solid $gray100', width: '100%', marginLeft: '0' }}
            />
            <Comments />
            <ReviewModal visible={visible} setVisible={setVisible} />
        </>
    )
}

export default Reviews
