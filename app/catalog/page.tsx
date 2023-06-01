import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const CatalogPage = dynamic(() => import('@/_pages/CatalogPage'))

export const metadata: Metadata = {
    title: 'Каталог',
}

const Catalog = () => {
    return <CatalogPage />
}

export default Catalog
