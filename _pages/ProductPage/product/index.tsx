import { memo } from 'react'
import { Loading, Text } from '@nextui-org/react'
import { oneProductApi, ProductCard, ProductCardSkeleton } from '@/entities/product'

export default memo(function ProductContainer({ slug }: { slug: string }) {
    const { data: product, isLoading, isError } = oneProductApi.useGetOneProductQuery(slug)

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
