'use client'
import { Container } from '@nextui-org/react'
import dynamic from 'next/dynamic'

const CatalogPage = dynamic(() => import('@/_pages/CatalogPage'))

const Catalog = () => {
    return (
        <Container>
            <CatalogPage />
        </Container>
    )
}

export default Catalog
