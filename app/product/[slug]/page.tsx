import dynamic from 'next/dynamic'

const ProductPage = dynamic(() => import('@/_pages/ProductPage'))

const ProductSlug = () => {
    return <ProductPage />
}

export default ProductSlug
