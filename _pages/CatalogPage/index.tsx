'use client'
import NavBreadcrumbs from '@/entities/breadcrumbs/ui'
import { Container } from '@nextui-org/react'
import { FC } from 'react'
import Catergories from './catergories'
import SubCatergories from './subCatergories'

const CatalogPage: FC<{ params?: { slug: string } }> = ({ params }) => {
    const slug = params?.slug
    return (
        <Container>
            <NavBreadcrumbs />
            {slug ? <SubCatergories slug={slug} /> : <Catergories />}
        </Container>
    )
}

export default CatalogPage
