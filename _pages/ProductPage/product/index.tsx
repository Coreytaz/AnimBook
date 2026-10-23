import { memo } from 'react'
import { Text } from '@/shared/ui-kit'
import { ProductCard, ProductCardSkeleton } from '@/entities/product'
import { ViewedProduct } from '@/features/viewedProduct'
import { useParams } from 'next/navigation'

export default memo(function ProductContainer({
    product,
}: {
    product: import('@/entities/product/api/types').ApiProductData
}) {
    const isLoading = false
    ViewedProduct.Actions.useAddViewedProductHistory(product?._id!)

    if (isLoading) {
        return <ProductCardSkeleton />
    }

    return (
        <>
            <Text
                h1
                css={{
                    mb: '24px',
                    fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
                }}
                weight="bold"
            >
                {product?.name}
            </Text>
            <ProductCard {...product!} />
        </>
    )
})
