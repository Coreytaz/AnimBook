import { Publisher } from '@/shared/api'
import { Button, Card, Checkbox, Col, Collapse, FormElement, Input, Row } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { FC, use } from 'react'
import * as catalogParams from '../params'

async function getData(
    slug: string
): Promise<{ publisher: Publisher[]; lowPriceAndMax: { max: number; min: number } }> {
    const res = await fetch(
        'http://localhost:3000/api/getFilters?' +
            new URLSearchParams({
                slug,
            })
    )
    return res.json()
}

const Sidebar: FC<{ slug: string }> = ({ slug }) => {
    const { publisher, lowPriceAndMax } = use(getData(slug))
    const pathname = usePathname()

    const onReset = () => {
        window.history.replaceState(null, '', pathname)
        window.location.reload()
    }

    return (
        <Card css={{ position: 'sticky', left: '0' }}>
            <Collapse.Group>
                {lowPriceAndMax && <PriceSection lowPriceAndMax={lowPriceAndMax} />}
                {publisher && <PublisherSection publisher={publisher} />}
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
    const { selected: from, onChangePublisher: setFrom } = catalogParams.usePrices('minPrice')
    const { selected: to, onChangePublisher: setTo } = catalogParams.usePrices('maxPrice')
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
    const { selected, onChange } = catalogParams.useFilter('pub')
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
