import dynamic from 'next/dynamic'

const ProductPage = dynamic(() => import('@/_pages/ProductPage'))

export default function ProductSlug({ params }: { params: { slug: string } }) {
    return <ProductPage params={params} />
}
