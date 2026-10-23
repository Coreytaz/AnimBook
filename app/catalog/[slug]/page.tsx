import CatalogPage from '@/_pages/CatalogPage'
import { serverGet } from '@/shared/api/server'
import type { ApiSubCatergoriesData } from '@/entities/catergories/api/types'
import type { ApiFiltersData } from '@/entities/sidebar/api/types'
import type { ProductsData } from '@/_pages/CatalogPage/content'
export const dynamic = 'force-dynamic'
export default async function Catalog({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>
    searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
    const { slug } = await params
    const search = await searchParams
    const category = await serverGet<ApiSubCatergoriesData>(
        '/catergories/Sub/' + encodeURIComponent(slug),
        false
    )
    if (category.subcategories.length) return <CatalogPage category={category} />
    const query = new URLSearchParams()
    for (const key of ['sort', 'page', 'limit', 'minPrice', 'maxPrice', 'pub']) {
        const value = search[key]
        if (typeof value === 'string') query.set(key, value)
    }
    const [products, filters] = await Promise.all([
        serverGet<ProductsData>(
            '/product/getProducts/' + encodeURIComponent(slug) + '?' + query,
            false
        ),
        serverGet<ApiFiltersData>('/catergories/filters/' + encodeURIComponent(slug), false),
    ])
    return (
        <CatalogPage
            key={slug + '?' + query}
            category={category}
            products={products}
            filters={filters}
        />
    )
}
