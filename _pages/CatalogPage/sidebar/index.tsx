'use client'
import {
    Accordion,
    Button,
    Card,
    Checkbox,
    CheckboxGroup,
    InputGroup,
    Label,
    Slider,
    TextField,
} from '@heroui/react'
import { RotateCcw, SlidersHorizontal } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { ApiFiltersData } from '@/entities/sidebar/api/types'

export default function Sidebar({ data }: { data?: ApiFiltersData }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const from = searchParams?.get('minPrice') || ''
    const to = searchParams?.get('maxPrice') || ''
    const publishers = searchParams?.get('pub')?.split('_').filter(Boolean) || []
    const activeCount = Number(Boolean(from || to)) + publishers.length
    const update = (values: Record<string, string>) => {
        const params = new URLSearchParams(searchParams?.toString())
        for (const [key, value] of Object.entries(values)) {
            if (value) params.set(key, value)
            else params.delete(key)
        }
        params.delete('page')
        router.replace(pathname + (params.size ? '?' + params.toString() : ''), { scroll: false })
    }
    const bounds = data?.lowPriceAndMax
    return (
        <Card className="filter-card">
            <div className="filter-heading">
                <span>
                    <SlidersHorizontal size={17} /> Фильтры
                </span>
                {activeCount > 0 && (
                    <span className="filter-count" aria-label={'Активных фильтров: ' + activeCount}>
                        {activeCount}
                    </span>
                )}
            </div>
            <Accordion
                className="filter-accordion"
                allowsMultipleExpanded
                defaultExpandedKeys={['price', 'publishers']}
            >
                {bounds && (
                    <Accordion.Item id="price">
                        <Accordion.Heading>
                            <Accordion.Trigger>
                                Цена <span className="filter-unit">₽</span>
                                <Accordion.Indicator />
                            </Accordion.Trigger>
                        </Accordion.Heading>
                        <Accordion.Panel>
                            <Accordion.Body>
                                <PriceRange bounds={bounds} from={from} to={to} onCommit={update} />
                            </Accordion.Body>
                        </Accordion.Panel>
                    </Accordion.Item>
                )}
                {!!data?.publisher.length && (
                    <Accordion.Item id="publishers">
                        <Accordion.Heading>
                            <Accordion.Trigger>
                                Издательство <Accordion.Indicator />
                            </Accordion.Trigger>
                        </Accordion.Heading>
                        <Accordion.Panel>
                            <Accordion.Body>
                                <CheckboxGroup
                                    aria-label="Издательства"
                                    value={publishers}
                                    onChange={(values) => update({ pub: values.join('_') })}
                                    className="filter-publishers"
                                >
                                    {data.publisher.map((publisher) => (
                                        <Checkbox
                                            key={publisher.id}
                                            value={publisher.slug}
                                            className="filter-publisher"
                                        >
                                            <Checkbox.Content>
                                                <Checkbox.Control>
                                                    <Checkbox.Indicator />
                                                </Checkbox.Control>
                                                <Label>{publisher.name}</Label>
                                            </Checkbox.Content>
                                        </Checkbox>
                                    ))}
                                </CheckboxGroup>
                            </Accordion.Body>
                        </Accordion.Panel>
                    </Accordion.Item>
                )}
            </Accordion>
            {!bounds && !data?.publisher.length && (
                <p className="filter-price-note">Для этой коллекции пока нет фильтров.</p>
            )}
            <div className="filter-footer">
                <Button
                    variant="secondary"
                    className="filter-reset"
                    isDisabled={!activeCount}
                    onPress={() => update({ minPrice: '', maxPrice: '', pub: '' })}
                >
                    <RotateCcw size={15} /> Сбросить фильтры
                </Button>
            </div>
        </Card>
    )
}

function PriceRange({
    bounds,
    from,
    to,
    onCommit,
}: {
    bounds: { min: number; max: number }
    from: string
    to: string
    onCommit: (values: Record<string, string>) => void
}) {
    const { min, max } = bounds
    const lower = from && Number.isFinite(+from) ? Math.min(max, Math.max(min, +from)) : min
    const upper = to && Number.isFinite(+to) ? Math.max(lower, Math.min(max, +to)) : max
    const [range, setRange] = useState([lower, upper])
    useEffect(() => setRange([lower, upper]), [lower, upper])
    const commit = (values: number[]) => {
        setRange(values)
        const minPrice = values[0] === min ? '' : String(values[0])
        const maxPrice = values[1] === max ? '' : String(values[1])
        if (minPrice !== from || maxPrice !== to) onCommit({ minPrice, maxPrice })
    }
    return (
        <>
            <div className="filter-price-grid">
                <PriceField
                    label="От"
                    value={String(range[0])}
                    placeholder={String(min)}
                    min={min}
                    max={range[1]}
                    onCommit={(value) => commit([value ? +value : min, range[1]])}
                />
                <PriceField
                    label="До"
                    value={String(range[1])}
                    placeholder={String(max)}
                    min={range[0]}
                    max={max}
                    onCommit={(value) => commit([range[0], value ? +value : max])}
                />
            </div>
            <Slider
                className="filter-price-slider"
                aria-label="Диапазон цены"
                minValue={min}
                maxValue={max}
                step={1}
                value={range}
                isDisabled={min === max}
                formatOptions={{ style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }}
                onChange={(values) => {
                    if (Array.isArray(values)) setRange(values)
                }}
                onChangeEnd={(values) => {
                    if (Array.isArray(values)) commit(values)
                }}
            >
                <Slider.Track>
                    <Slider.Fill />
                    <Slider.Thumb index={0} aria-label="Минимальная цена" />
                    <Slider.Thumb index={1} aria-label="Максимальная цена" />
                </Slider.Track>
            </Slider>
            <p className="filter-price-note">
                От {min.toLocaleString('ru-RU')} до {max.toLocaleString('ru-RU')} ₽
            </p>
        </>
    )
}

function PriceField({
    label,
    value,
    placeholder,
    min,
    max,
    onCommit,
}: {
    label: string
    value: string
    placeholder: string
    min: number
    max: number
    onCommit: (value: string) => void
}) {
    const [draft, setDraft] = useState(value)
    useEffect(() => setDraft(value), [value])
    const commit = () => {
        const parsed = Number(draft)
        const next =
            draft.trim() && Number.isFinite(parsed)
                ? String(Math.round(Math.min(max, Math.max(min, parsed))))
                : ''
        setDraft(next)
        if (next !== value) onCommit(next)
    }
    return (
        <TextField
            aria-label={label === 'От' ? 'Минимальная цена' : 'Максимальная цена'}
            className="filter-price-field"
            value={draft}
            onChange={setDraft}
            onBlur={commit}
        >
            <Label>{label}</Label>
            <InputGroup>
                <InputGroup.Input
                    inputMode="numeric"
                    placeholder={placeholder}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') event.currentTarget.blur()
                    }}
                />
                <InputGroup.Suffix>₽</InputGroup.Suffix>
            </InputGroup>
        </TextField>
    )
}
