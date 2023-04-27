import { catergoriesApi, CatergoriesCard } from '@/entities/catergories'
import { Container, Grid, Loading, Text } from '@nextui-org/react'
import { memo } from 'react'
import Content from '../content'
import Sidebar from '../sidebar'

export default memo(function SubCatergories({ slug }: { slug: string }) {
    const { data: items, isLoading, isError } = catergoriesApi.useGetSubCatergoriesQuery(slug)

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Container lg>
                <Text
                    h2
                    css={{
                        textGradient: '45deg, $blue600 10%, $pink600 100%',
                    }}
                    weight="bold"
                >
                    {items?.categoryName}
                </Text>
                {items?.subcategories.length! > 0 ? (
                    <Grid.Container gap={2} justify="center">
                        {items?.subcategories.map((item, index) => (
                            <Grid xs={12} sm={3} key={index}>
                                <CatergoriesCard {...item} />
                            </Grid>
                        ))}
                    </Grid.Container>
                ) : (
                    <Grid.Container gap={2} justify="center">
                        <Grid xs={12} sm={4} alignItems="flex-start">
                            <Sidebar slug={slug} />
                        </Grid>
                        <Grid xs={12} sm={8}>
                            <Content product={items?.products!} />
                        </Grid>
                    </Grid.Container>
                )}
            </Container>
        </>
    )
})
