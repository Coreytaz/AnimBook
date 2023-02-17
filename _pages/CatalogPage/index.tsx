import NavBreadcrumbs from '@/entities/breadcrumbs/ui'
import { FC } from 'react'
import CatergoriesPage from './catergories'

const CatalogPage: FC = () => {
    return (
        <>
            <NavBreadcrumbs />
            <CatergoriesPage />
        </>
    )
}

export default CatalogPage
