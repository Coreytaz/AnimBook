'use client'
import NavBreadcrumbs from '@/entities/breadcrumbs/ui'
import { Container, Spacer } from '@nextui-org/react'
import Product from './product'

const ProductPage = () => {
    return (
        <Container lg>
            <NavBreadcrumbs />
            <Spacer y={1} />
            <Product />
        </Container>
    )
}

export default ProductPage
