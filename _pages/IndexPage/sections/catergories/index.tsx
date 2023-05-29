import { catergoriesApi, CatergoriesCard, SkeletonCategoriesCard } from '@/entities/catergories'
import { Container, Grid, Text } from '@nextui-org/react'

export default function Catergories() {
    const { data: items, isLoading, isError } = catergoriesApi.useGetPopularCatergoriesQuery('')

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
                    {isLoading
                        ? [...new Array(4)].map((_, i) => (
                              <Grid xs={12} sm={6} md={3} key={i}>
                                  <SkeletonCategoriesCard />
                              </Grid>
                          ))
                        : items?.map((item, index) => (
                              <Grid xs={12} sm={6} md={3} key={index}>
                                  <CatergoriesCard {...item} />
                              </Grid>
                          ))}
                </Grid.Container>
            </Container>
        </>
    )
}
