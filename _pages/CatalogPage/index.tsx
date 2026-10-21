'use client'
import NavBreadcrumbs from '@/entities/breadcrumbs/ui'
import { Container } from '@/shared/ui-kit'
import { useParams } from 'next/navigation'
import { FC } from 'react'
import Catergories from './catergories'
import SubCatergories from './subCatergories'

const CatalogPage: FC = () => {
    const params = useParams()
    return (
        <Container>
            <NavBreadcrumbs />
            {params?.slug! ? <SubCatergories /> : <Catergories />}
        </Container>
    )
}

export default CatalogPage
