import { FC } from 'react'
import { Card, Grid, Text } from '@nextui-org/react'

const Product: FC = () => {
    return (
        <>
            <Text
                h2
                css={{
                    textGradient: '45deg, $blue600 10%, $pink600 100%',
                }}
                weight="bold"
            >
                Товар
            </Text>
            <ProductCard />
        </>
    )
}

const ProductCard: FC = () => {
    return (
        <Card>
            <Grid.Container gap={2} justify="center">
                <Grid xs={6}></Grid>
                <Grid xs={6}></Grid>
            </Grid.Container>
        </Card>
    )
}

export default Product
