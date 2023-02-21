import dynamic from 'next/dynamic'

const CatalogPage = dynamic(() => import('@/_pages/CatalogPage'))

const Catalog = () => {
    return <CatalogPage />
}

export default Catalog
