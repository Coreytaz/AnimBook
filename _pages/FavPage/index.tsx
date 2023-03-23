'use client'
import { useActionFav, useFav } from '@/entities/fav'
import { ProductRowCard } from '@/entities/product'
import { Cart } from '@/features/cart'
import { Fav } from '@/features/fav'
import { Button, Card, Container, Grid, Loading, Text } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { FC, useEffect } from 'react'

const FavPage: FC = () => {
    const { getFavProduct } = useActionFav()
    const { products, favoritesId } = useFav()
    const router = useRouter()

    useEffect(() => {
        getFavProduct()
    }, [favoritesId, getFavProduct])

    if (products.status === 'loading') {
        return (
            <Loading
                css={{
                    dflex: 'center',
                }}
            />
        )
    }
    return (
        <Container lg>
            <Text
                h2
                css={{
                    textGradient: '45deg, $blue600 10%, $pink600 100%',
                }}
                weight="bold"
            >
                Избранное
            </Text>
            <Grid.Container css={{ gap: '$10' }} alignContent="flex-start">
                {products.favoritesItems.length > 0 ? (
                    products.favoritesItems.map((prod) => (
                        <ProductRowCard
                            data={prod}
                            key={prod._id}
                            actions={
                                <>
                                    <Fav.Actions.AddProduct productId={prod._id} />
                                    <Cart.Actions.AddProduct productId={prod._id} />
                                </>
                            }
                        />
                    ))
                ) : (
                    <Card css={{ mw: '100%' }}>
                        <Card.Body>
                            <Text h3 css={{ textAlign: 'center' }}>
                                В списке пока нет ни одного избранного товара 😔
                            </Text>
                        </Card.Body>
                        <Card.Footer css={{ gap: '$5', display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={() => router.push('/catalog')}>В каталог</Button>
                        </Card.Footer>
                    </Card>
                )}
            </Grid.Container>
        </Container>
    )
}

export default FavPage
