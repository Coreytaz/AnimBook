import { CatergoriesCard } from '@/entities/catergories'
import { Container, Grid, Text } from '@nextui-org/react'
import { FC } from 'react'

const items = [
    {
        title: 'Категория 1',
        description: 'Описание категории 1',
        img: 'https://nextui.org/images/card-example-4.jpeg',
        altImg: 'placeholder',
    },
    {
        title: 'Категория 2',
        description: 'Описание категории 2',
        img: 'https://nextui.org/images/card-example-4.jpeg',
        altImg: 'placeholder',
    },
    {
        title: 'Категория 3',
        description: 'Описание категории 3',
        img: 'https://nextui.org/images/card-example-4.jpeg',
        altImg: 'placeholder',
    },
    {
        title: 'Категория 4',
        description: 'Описание категории 4',
        img: 'https://nextui.org/images/card-example-4.jpeg',
        altImg: 'placeholder',
    },
]

const Catergories: FC = () => {
    return (
        <>
            <Container lg>
                <Text
                    h2
                    css={{
                        textAlign: 'center',
                        textGradient: '45deg, $blue600 10%, $pink600 100%',
                    }}
                    weight="bold"
                >
                    Популярные категории
                </Text>
                <Grid.Container gap={2} justify="center">
                    {items.map((item, index) => (
                        <Grid xs={12} sm={3} key={index}>
                            <CatergoriesCard {...item} />
                        </Grid>
                    ))}
                </Grid.Container>
            </Container>
        </>
    )
}
export default Catergories
