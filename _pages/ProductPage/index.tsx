'use client'
import NavBreadcrumbs from '@/entities/breadcrumbs/ui'
import { Container, Spacer } from '@nextui-org/react'
import { FC } from 'react'
import DetailedProductInfo from './description'
import ProductContainer from './product'

const ProductPage: FC<{ params: { slug: string } }> = ({ params }) => {
    const slug = params?.slug
    return (
        <Container lg>
            <NavBreadcrumbs />
            <Spacer y={1} />
            <ProductContainer slug={slug} />
            <Spacer y={3} />
            <DetailedProductInfo slug={slug} />
        </Container>
    )
}

export default ProductPage
