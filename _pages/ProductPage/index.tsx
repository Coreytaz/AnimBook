'use client'
import NavBreadcrumbs from '@/entities/breadcrumbs/ui'
import { Container, Spacer } from '@/shared/ui-kit'
import { FC } from 'react'
import DetailedProductInfo from './description'
import ProductContainer from './product'

const ProductPage: FC<{ product: import('@/entities/product/api/types').ApiProductData }> = ({
    product,
}) => {
    return (
        <Container lg>
            <NavBreadcrumbs currentLabel={product.name} />
            <Spacer y={1} />
            <ProductContainer product={product} />
            <Spacer y={3} />
            <DetailedProductInfo />
        </Container>
    )
}

export default ProductPage
