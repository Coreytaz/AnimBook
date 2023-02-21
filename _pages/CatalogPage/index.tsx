'use client'
import NavBreadcrumbs from '@/entities/breadcrumbs/ui'
import { Container } from '@nextui-org/react'
import { FC } from 'react'
import CatergoriesPage from './catergories'

const CatalogPage: FC = () => {
    return (
        <Container>
            <NavBreadcrumbs />
            <CatergoriesPage />
        </Container>
    )
}

export default CatalogPage
