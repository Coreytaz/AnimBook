import { ProductGridCard, ProductRowCard } from '@/entities/product'
import { Cart } from '@/features/cart'
import { Fav } from '@/features/fav'
import { Pagination } from '@/shared/ui-kit'
import { Button, Label, ListBox, Select } from '@heroui/react'
import { BookOpen, LayoutGrid, List } from 'lucide-react'
import * as catalogParams from '../params'
export type ProductsData = {
    items: import('@/entities/product/api/types').ApiProductData[]
    meta: import('@/entities/product/api/types').Meta
    links: import('@/entities/product/api/types').Links
}
export default function Content({ items }: { items?: ProductsData }) {
    const { selected: sort, onChange: setSort } = catalogParams.useFilter('sort')
    const { selected: page, onChange: setPage } = catalogParams.useFilter('page')
    const vt = catalogParams.useViewType('vt')
    return (
        <section className="catalog-content" aria-label="Книги">
            <div className="catalog-toolbar">
                <Select
                    className="catalog-sort"
                    aria-label="Сортировка книг"
                    value={sort || '-price'}
                    onChange={(value) => {
                        if (value !== null) setSort(String(value))
                    }}
                >
                    <Label>Сортировка</Label>
                    <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className="catalog-sort-popover" placement="bottom start">
                        <ListBox aria-label="Порядок сортировки">
                            <ListBox.Item id="-price" textValue="Сначала недорогие">
                                <Label>Сначала недорогие</Label>
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="price" textValue="Сначала дорогие">
                                <Label>Сначала дорогие</Label>
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="rating" textValue="По рейтингу">
                                <Label>По рейтингу</Label>
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                        </ListBox>
                    </Select.Popover>
                </Select>
                <div className="catalog-view-toggle" role="group" aria-label="Вид каталога">
                    <Button
                        variant="ghost"
                        isIconOnly
                        aria-label="Показать сеткой"
                        aria-pressed={vt.isGrid}
                        onPress={() => vt.setViewType('grid')}
                    >
                        <LayoutGrid size={19} />
                    </Button>
                    <Button
                        variant="ghost"
                        isIconOnly
                        aria-label="Показать списком"
                        aria-pressed={vt.isList}
                        onPress={() => vt.setViewType('list')}
                    >
                        <List size={19} />
                    </Button>
                </div>
            </div>
            {items?.items.length ? (
                <div className={vt.isList ? 'product-list' : 'product-grid'}>
                    {items.items.map((data) => {
                        const actions = (
                            <>
                                <Fav.Actions.AddBookMini productId={data._id} />
                                <Cart.Actions.AddBookMini productId={data._id} />
                            </>
                        )
                        return vt.isList ? (
                            <ProductRowCard key={data._id} data={data} actions={actions} />
                        ) : (
                            <ProductGridCard key={data._id} data={data} actions={actions} />
                        )
                    })}
                </div>
            ) : (
                <div className="catalog-empty">
                    <BookOpen size={40} />
                    <h2>Пока нет подходящих книг</h2>
                    <p>Попробуйте изменить фильтры или выбрать другую категорию.</p>
                </div>
            )}
            {!!items?.meta.totalPages && items.meta.totalPages > 1 && (
                <div className="catalog-pagination">
                    <Pagination
                        onChange={(n) => setPage(String(n))}
                        total={items.meta.totalPages}
                        page={items.meta.currentPage || +page || 1}
                    />
                </div>
            )}
        </section>
    )
}
