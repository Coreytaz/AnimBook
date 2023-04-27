import { catergoriesApi, CatergoriesCard } from '@/entities/catergories'
import { Container, Grid, Text } from '@nextui-org/react'
import { memo } from 'react'

export default memo(function Catergories() {
    const { data: items, isLoading, isError } = catergoriesApi.useGetCatergoriesQuery('')
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
                    {items?.map((item, index) => (
                        <Grid xs={12} sm={3} key={index}>
                            <CatergoriesCard {...item} />
                        </Grid>
                    ))}
                </Grid.Container>
            </Container>
        </>
    )
})
