import { filtersApi, SidebarSkeleton } from '@/entities/sidebar'
import { Publisher } from '@/shared/api'
import {
    Button,
    Card,
    Checkbox,
    Col,
    Collapse,
    FormElement,
    Input,
    Loading,
    Row,
} from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import * as catalogParams from '../params'

const Sidebar: FC<{ slug: string }> = ({ slug }) => {
    const { data, isLoading, isError } = filtersApi.useGetFiltersQuery(slug)
    const pathname = usePathname()

    const onReset = () => {
        window.history.replaceState(null, '', pathname)
        window.location.reload()
    }

    if (isLoading) {
        return <SidebarSkeleton />
    }

    return (
        <Card css={{ position: 'sticky', left: '0', top: '$24' }}>
            <Collapse.Group animated={false}>
                {data?.lowPriceAndMax && <PriceSection lowPriceAndMax={data?.lowPriceAndMax} />}
                {data?.publisher && <PublisherSection publisher={data?.publisher} />}
            </Collapse.Group>
            <Row justify="center">
                <Button shadow css={{ m: '$10' }} onClick={onReset}>
                    Сбросить
                </Button>
            </Row>
        </Card>
    )
}

const PriceSection: FC<{ lowPriceAndMax: { max: number; min: number } }> = ({ lowPriceAndMax }) => {
    const { selected: from, onChange: setFrom } = catalogParams.useFilter('minPrice')
    const { selected: to, onChange: setTo } = catalogParams.useFilter('maxPrice')
    const onChangeBlurInput = (
        e: React.FocusEvent<FormElement, Element>,
        callback: (value: string) => void
    ) => {
        if (e.target.value === '') {
            e.target.value = ''
            return
        }
        if (+e.target.value < lowPriceAndMax.min) {
            callback(lowPriceAndMax.min.toString())
        }
        if (+e.target.value > lowPriceAndMax.max) {
            callback(lowPriceAndMax.max.toString())
        }
    }
    return (
        <Collapse title="Цена">
            <Row justify="center" css={{ p: '$5', gap: '$5', mb: '$5' }}>
                <Col>
                    <Input
                        css={{
                            width: '$full',
                            '& input': {
                                pr: '$8',
                            },
                        }}
                        onBlur={(e) => onChangeBlurInput(e, setFrom)}
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        placeholder={`От ${lowPriceAndMax.min}`}
                        min={lowPriceAndMax.min}
                        max={lowPriceAndMax.max}
                        type="number"
                        color="primary"
                        bordered
                        clearable
                    />
                </Col>
                <Col>
                    <Input
                        css={{
                            width: '$full',
                            '& input': {
                                pr: '$8',
                            },
                        }}
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        onBlur={(e) => onChangeBlurInput(e, setTo)}
                        placeholder={`До ${lowPriceAndMax.max}`}
                        min={lowPriceAndMax.min}
                        max={lowPriceAndMax.max}
                        type="number"
                        color="primary"
                        bordered
                        clearable
                    />
                </Col>
            </Row>
        </Collapse>
    )
}

const PublisherSection: FC<{ publisher: Publisher[] }> = ({ publisher }) => {
    const { selected, onChange } = catalogParams.useFilters('pub')
    return (
        <Collapse title="Издательство">
            <Checkbox.Group defaultValue={[]} value={selected} onChange={onChange}>
                <div
                    style={{
                        maxHeight: '300px',
                        overflow: 'scroll',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {publisher.map((publis) => (
                        <Checkbox key={publis.id} value={publis.slug}>
                            {publis.name}
                        </Checkbox>
                    ))}
                </div>
            </Checkbox.Group>
        </Collapse>
    )
}

export default Sidebar
