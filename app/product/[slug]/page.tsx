import dynamic from 'next/dynamic'

const ProductPage = dynamic(() => import('@/_pages/ProductPage'), { ssr: false })

export default function ProductSlug() {
    return <ProductPage />
}
