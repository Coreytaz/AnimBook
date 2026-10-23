'use client'
import NavBreadcrumbs from '@/entities/breadcrumbs/ui'
import { Container } from '@/shared/ui-kit'
import type { ApiCatergoriesData, ApiSubCatergoriesData } from '@/entities/catergories/api/types'
import type { ApiFiltersData } from '@/entities/sidebar/api/types'
import type { ProductsData } from './content'
import Catergories from './catergories'
import SubCatergories from './subCatergories'
export default function CatalogPage({
    categories = [],
    category,
    products,
    filters,
}: {
    categories?: ApiCatergoriesData[]
    category?: ApiSubCatergoriesData
    products?: ProductsData
    filters?: ApiFiltersData
}) {
    return (
        <div>
            <NavBreadcrumbs currentLabel={category?.categoryName || 'Каталог'} />
            {category ? (
                <SubCatergories items={category} products={products} filters={filters} />
            ) : (
                <Catergories items={categories} />
            )}
        </div>
    )
}
