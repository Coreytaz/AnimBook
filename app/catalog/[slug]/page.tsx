import dynamic from 'next/dynamic'

const CatalogPage = dynamic(() => import('@/_pages/CatalogPage'), { ssr: false })

export default function Catalog() {
    return <CatalogPage />
}
