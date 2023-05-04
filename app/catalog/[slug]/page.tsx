import dynamic from 'next/dynamic'

const CatalogPage = dynamic(() => import('@/_pages/CatalogPage'), { ssr: false })

export default function Catalog({ params }: { params: { slug: string } }) {
    return <CatalogPage params={params} />
}
