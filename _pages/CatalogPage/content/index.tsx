import { ProductRowCard } from '@/entities/product'
import { Cart } from '@/features/cart'
import { Fav } from '@/features/fav'
import { ProductProps } from '@/shared/api'
import { Grid } from '@nextui-org/react'
import { FC } from 'react'

const Content: FC<{ product: ProductProps[] }> = ({ product }) => {
    return (
        <Grid.Container css={{ gap: '$10' }} alignContent="flex-start">
            {product.map((prod) => (
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
            ))}
        </Grid.Container>
    )
}

export default Content
