import { ProductGridCard, ProductRowCard } from '@/entities/product'
import { Cart } from '@/features/cart'
import { Fav } from '@/features/fav'
import { ProductProps } from '@/shared/api'
import { Button, Grid } from '@nextui-org/react'
import { FC } from 'react'
import * as catalogParams from '../params'

const Content: FC<{ product: ProductProps[] }> = ({ product }) => {
    return (
        <Grid.Container css={{ gap: '$10' }} alignContent="flex-start">
            {product.map((prod) => (
                <ProductItem data={prod} key={prod._id} />
            ))}
        </Grid.Container>
    )
}

const ProductItem = ({ data }: { data: ProductProps }) => {
    const vtParam = catalogParams.useViewType('vt')

    return (
        <>
            {vtParam.isGrid && (
                <ProductGridCard
                    data={data}
                    actions={
                        <>
                            <Button.Group ghost css={{ minWidth: '100%' }}>
                                <Fav.Actions.AddBookMini productId={data._id} />
                                <Cart.Actions.AddBookMini productId={data._id} />
                            </Button.Group>
                        </>
                    }
                />
            )}
            {vtParam.isList && (
                <ProductRowCard
                    data={data}
                    actions={
                        <>
                            <Fav.Actions.AddProduct productId={data._id} />
                            <Cart.Actions.AddProduct productId={data._id} />
                        </>
                    }
                />
            )}
        </>
    )
}

export default Content
