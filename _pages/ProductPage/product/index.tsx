import { memo } from 'react'
import { Text } from '@nextui-org/react'
import { oneProductApi, ProductCard, ProductCardSkeleton } from '@/entities/product'
import { ViewedProduct } from '@/features/viewedProduct'
import { useParams } from 'next/navigation'

export default memo(function ProductContainer() {
    const params = useParams()
    const {
        data: product,
        isLoading,
        isError,
    } = oneProductApi.useGetOneProductQuery(params?.slug.toString()!)
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
