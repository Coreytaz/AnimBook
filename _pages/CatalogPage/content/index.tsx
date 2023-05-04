import {
    getProductsApi,
    oneProductApi,
    ProductGridCard,
    ProductRowCard,
    SkeletonCard,
    SkeletonRow,
} from '@/entities/product'
import { Cart } from '@/features/cart'
import { Fav } from '@/features/fav'
import { ProductProps } from '@/shared/api'
import { Button, Card, Dropdown, Grid, Spacer, Switch, SwitchEvent } from '@nextui-org/react'
import { LayoutGrid, List } from 'lucide-react'
import { FC, useMemo, useState, Key } from 'react'
import * as catalogParams from '../params'

type Selection = 'all' | Set<Key>

const menuItems = [
    { key: '-price', name: 'Сначала недорогие' },
    { key: 'price', name: 'Сначала дорогие' },
    { key: 'rating', name: 'С лучшей оценкой' },
]

const ViewTypes = {
    Grid: { key: 'grid', Icon: LayoutGrid },
    List: { key: 'list', Icon: List },
}

const Content: FC<{ slug: string }> = ({ slug }) => {
    const { data: items, isLoading, isError } = getProductsApi.useGetProductsQuery(slug)
    const { selected: selectSort, onChange: setFrom } = catalogParams.useFilter('sort')
    const vtParam = catalogParams.useViewType('vt')
    const [selected, setSelected] = useState<Selection>(new Set([selectSort || '-price']))
    const selectedValue = useMemo(
        () => Array.from(selected).join(', ').replaceAll('_', ' '),
        [selected]
    )
    const onChangeSortType = (e: Selection) => {
        setSelected(e)
        setFrom(Array.from(e).join(', ').replaceAll('_', ' '))
    }
    const onChangeVt = (e: SwitchEvent) => {
        if (e.target.checked) {
            vtParam.setViewType(ViewTypes.Grid.key)
        } else {
            vtParam.setViewType(ViewTypes.List.key)
        }
    }
    return (
        <section style={{ width: '100%' }}>
            <Card css={{ p: '$5 $8' }}>
                <Grid.Container>
                    <Grid xs={6}>
                        <Dropdown disableAnimation>
                            <Dropdown.Button light css={{ p: 0 }}>
                                Сортировка:{' '}
                                {menuItems.filter((item) => item.key === selectedValue)[0].name}
                            </Dropdown.Button>
                            <Dropdown.Menu
                                aria-label="Single selection actions"
                                color="primary"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selected}
                                onSelectionChange={onChangeSortType}
                                items={menuItems}
                            >
                                {(item: any) => (
                                    <Dropdown.Item key={item.key}>{item.name}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Grid>
                    <Grid xs={6} justify="flex-end">
                        <Switch
                            initialChecked={vtParam.isGrid ? true : false}
                            onChange={onChangeVt}
                            squared
                            animated={false}
                            size="xl"
                            iconOn={<ViewTypes.Grid.Icon />}
                            iconOff={<ViewTypes.List.Icon />}
                        />
                    </Grid>
                </Grid.Container>
            </Card>
            <Spacer />
            <Grid.Container gap={2} css={{ gap: '$10 0' }} alignContent="flex-start">
                {isLoading
                    ? [...new Array(6)].map((_, i) => (
                          <ProductItemSkeleton
                              key={i}
                              isGrid={vtParam.isGrid}
                              isList={vtParam.isList}
                          />
                      ))
                    : items?.products.map((prod) => (
                          <ProductItem
                              data={prod}
                              key={prod._id}
                              isGrid={vtParam.isGrid}
                              isList={vtParam.isList}
                          />
                      ))}
            </Grid.Container>
        </section>
    )
}

const ProductItemSkeleton = ({ isGrid, isList }: { isGrid: boolean; isList: boolean }) => {
    return (
        <>
            {isGrid && (
                <Grid xs={12} md={5} lg={4}>
                    <SkeletonCard />
                </Grid>
            )}
            {isList && <SkeletonRow />}
        </>
    )
}

const ProductItem = ({
    data,
    isGrid,
    isList,
}: {
    data: ProductProps
    isGrid: boolean
    isList: boolean
}) => {
    return (
        <>
            {isGrid && (
                <Grid xs={12} md={5} lg={4}>
                    <ProductGridCard
                        data={data}
                        actions={
                            <>
                                <Button.Group ghost css={{ minWidth: '100%' }}>
                                    <Fav.Actions.AddBookMini productId={data._id} />
                                    <Cart.Actions.AddBookMini productId={data._id} />
                                </Button.Group>
                            </>
                        }
                    />
                </Grid>
            )}
            {isList && (
                <ProductRowCard
                    data={data}
                    actions={
                        <>
                            <Fav.Actions.AddProduct productId={data._id} />
                            <Cart.Actions.AddProduct productId={data._id} />
                        </>
                    }
                />
            )}
        </>
    )
}

export default Content
