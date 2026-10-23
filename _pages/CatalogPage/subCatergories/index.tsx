import { CatergoriesCard } from '@/entities/catergories'
import { SlidersHorizontal } from 'lucide-react'
import { Button } from '@heroui/react'
import { useState } from 'react'
import Content from '../content'
import Sidebar from '../sidebar'
export default function SubCatergories({
    items,
    products,
    filters,
}: {
    items: import('@/entities/catergories/api/types').ApiSubCatergoriesData
    products?: import('../content').ProductsData
    filters?: import('@/entities/sidebar/api/types').ApiFiltersData
}) {
    const [showFilters, setShowFilters] = useState(false)
    return (
        <section>
            <div className="page-heading">
                <span className="eyebrow">Найдите свою историю</span>
                <h1>{items.categoryName}</h1>
                {products && <p>Книг в коллекции: {products.meta.totalItems}</p>}
            </div>
            {items.subcategories.length ? (
                <div className="category-grid">
                    {items.subcategories.map((item) => (
                        <CatergoriesCard key={item._id} {...item} />
                    ))}
                </div>
            ) : (
                <>
                    <Button
                        variant="secondary"
                        className="mobile-filter-button"
                        aria-expanded={showFilters}
                        aria-controls="catalog-filters"
                        onPress={() => setShowFilters(!showFilters)}
                    >
                        <SlidersHorizontal size={18} />
                        {showFilters ? 'Скрыть фильтры' : 'Фильтры'}
                    </Button>
                    <div className="catalog-layout">
                        <aside
                            id="catalog-filters"
                            className={showFilters ? 'catalog-filters is-open' : 'catalog-filters'}
                            aria-label="Фильтры каталога"
                        >
                            <Sidebar data={filters} />
                        </aside>
                        <Content items={products} />
                    </div>
                </>
            )}
        </section>
    )
}
