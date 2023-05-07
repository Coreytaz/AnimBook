import { memo, useEffect } from 'react'
import { Text } from '@nextui-org/react'
import { oneProductApi, ProductCard, ProductCardSkeleton } from '@/entities/product'
import { ViewedProduct } from '@/features/viewedProduct'

export default memo(function ProductContainer({ slug }: { slug: string }) {
    const { data: product, isLoading, isError } = oneProductApi.useGetOneProductQuery(slug)
    ViewedProduct.Actions.useAddViewedProductHistory(product?._id!)

    if (isLoading) {
        return <ProductCardSkeleton />
    }

    return (
        <>
            <Text
                h2
                css={{
                    textGradient: '45deg, $blue600 10%, $pink600 100%',
                }}
                weight="bold"
            >
                {product?.name}
            </Text>
            <ProductCard {...product!} />
        </>
    )
})
