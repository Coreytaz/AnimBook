import { Suspense } from 'react'
import ProductPage from '@/_pages/ProductPage'
import { serverGet } from '@/shared/api/server'
import type { ApiProductData } from '@/entities/product/api/types'
export const revalidate = 300
export async function generateStaticParams() {
    return []
}
export default async function ProductSlug({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const product = await serverGet<ApiProductData>('/product/slug/' + encodeURIComponent(slug))
    return (
        <Suspense>
            <ProductPage product={product} />
        </Suspense>
    )
}
