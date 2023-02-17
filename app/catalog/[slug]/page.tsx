'use client'
import { Container } from '@nextui-org/react'
import dynamic from 'next/dynamic'

const ProductPage = dynamic(() => import('@/_pages/ProductPage'))

const CatalogSlug = () => {
    return (
        <Container>
            <ProductPage />
        </Container>
    )
}

export default CatalogSlug
