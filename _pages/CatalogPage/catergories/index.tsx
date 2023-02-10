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
        title: 'Категория 5',
        description: 'Описание категории 5',
        img: 'https://nextui.org/images/card-example-4.jpeg',
        altImg: 'placeholder',
    },
    {
        title: 'Категория 6',
        description: 'Описание категории 6',
        img: 'https://nextui.org/images/card-example-4.jpeg',
        altImg: 'placeholder',
    },
    {
        title: 'Категория 7',
        description: 'Описание категории 7',
        img: 'https://nextui.org/images/card-example-4.jpeg',
        altImg: 'placeholder',
    },
    {
        title: 'Категория 8',
        description: 'Описание категории 8',
        img: 'https://nextui.org/images/card-example-4.jpeg',
        altImg: 'placeholder',
    },
    {
        title: 'Категория 9',
        description: 'Описание категории 9',
        img: 'https://nextui.org/images/card-example-4.jpeg',
        altImg: 'placeholder',
    },
]

const CatergoriesPage: FC = () => {
    return (
        <Container lg>
            <Text
                h2
                css={{
                    textGradient: '45deg, $blue600 10%, $pink600 100%',
                }}
                weight="bold"
            >
                Каталог товаров
            </Text>
            <Grid.Container gap={2} justify="center">
                {items.map((item, index) => (
                    <Grid xs={12} sm={3} key={index}>
                        <CatergoriesCard {...item} />
                    </Grid>
                ))}
            </Grid.Container>
        </Container>
    )
}

export default CatergoriesPage
