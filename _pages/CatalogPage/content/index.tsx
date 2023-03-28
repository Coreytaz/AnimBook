import { ProductGridCard, ProductRowCard } from '@/entities/product'
import { Cart } from '@/features/cart'
import { Fav } from '@/features/fav'
import { ProductProps } from '@/shared/api'
import { Button, Card, Dropdown, Grid, Spacer, Switch, SwitchEvent } from '@nextui-org/react'
import { FC, useMemo, useState, Key } from 'react'
import * as catalogParams from '../params'
import GridSvg from './svg/Grid'
import ListSvg from './svg/List'

type Selection = 'all' | Set<Key>

const menuItems = [
    { key: '-price', name: 'Сначала недорогие' },
    { key: 'price', name: 'Сначала дорогие' },
    { key: 'rating', name: 'С лучшей оценкой' },
]

const ViewTypes = {
    Grid: { key: 'grid', Icon: GridSvg },
    List: { key: 'list', Icon: ListSvg },
}

const Content: FC<{ product: ProductProps[] }> = ({ product }) => {
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
        <section>
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
                            iconOn={<ViewTypes.Grid.Icon filled />}
                            iconOff={<ViewTypes.List.Icon filled />}
                        />
                    </Grid>
                </Grid.Container>
            </Card>
            <Spacer />
            <Grid.Container css={{ gap: '$10' }} alignContent="flex-start">
                {product.map((prod) => (
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
