import { CatergoriesCard } from '@/entities/catergories'
import { CatergoriesListProps } from '@/shared/api'
import { Container, Grid, Text } from '@nextui-org/react'
import { FC, memo, use } from 'react'

async function getData(): Promise<CatergoriesListProps[]> {
    const res = await fetch('http://localhost:3000/api/catergoriesAll')
    return res.json()
}

export default memo(function Catergories() {
    const items = use(getData())
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
})
