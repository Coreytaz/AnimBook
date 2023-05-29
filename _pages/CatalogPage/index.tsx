'use client'
import NavBreadcrumbs from '@/entities/breadcrumbs/ui'
import { Container } from '@nextui-org/react'
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
