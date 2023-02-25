'use client'
import NavBreadcrumbs from '@/entities/breadcrumbs/ui'
import { Container, Spacer } from '@nextui-org/react'
import DetailedProductInfo from './description'
import ProductContainer from './product'

const ProductPage = () => {
    return (
        <Container lg>
            <NavBreadcrumbs />
            <Spacer y={1} />
            <ProductContainer />
            <Spacer y={3} />
            <DetailedProductInfo />
        </Container>
    )
}

export default ProductPage
