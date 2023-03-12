import { CatergoriesCard } from '@/entities/catergories'
import { CatergoriesListProps, ProductProps } from '@/shared/api'
import { Container, Grid, Text } from '@nextui-org/react'
import { FC, memo, use } from 'react'
import Content from '../content'
import Sidebar from '../sidebar'

async function getData(slug: string): Promise<{
    categoryName: string
    subcategories: CatergoriesListProps[]
    products: ProductProps[]
}> {
    const res = await fetch(
        'http://localhost:3000/api/catergories?' +
            new URLSearchParams({
                slug,
            }),
        { next: { revalidate: 10 } }
    )
    return res.json()
}

export default memo(function SubCatergories({ slug }: { slug: string }) {
    const items = use(getData(slug))
    return (
        <Container lg>
            <Text
                h2
                css={{
                    textGradient: '45deg, $blue600 10%, $pink600 100%',
                }}
                weight="bold"
            >
                {items.categoryName}
            </Text>
            {items.subcategories.length > 0 ? (
                <Grid.Container gap={2} justify="center">
                    {items.subcategories.map((item, index) => (
                        <Grid xs={12} sm={3} key={index}>
                            <CatergoriesCard {...item} />
                        </Grid>
                    ))}
                </Grid.Container>
            ) : (
                <Grid.Container gap={2} justify="center">
                    <Grid xs={12} sm={4}>
                        <Sidebar slug={slug} />
                    </Grid>
                    <Grid xs={12} sm={8}>
                        <Content product={items.products} />
                    </Grid>
                </Grid.Container>
            )}
        </Container>
    )
})
