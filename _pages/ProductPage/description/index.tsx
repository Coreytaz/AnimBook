import { Product } from '@/features/product'
import { Grid, Collapse } from '@/shared/ui-kit'
import { setProductTab } from '@/shared/lib/productTabs'
import { useSearchParams } from 'next/navigation'
import { FC, useEffect, useRef } from 'react'

enum Tabs {
    Characteristics = 1,
    Opinion = 2,
}

const DetailedProductInfo: FC = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const searchParams = useSearchParams()
    const tabs = searchParams?.get('tabs')

    const onChangeCollapse = (i: number | undefined, value: boolean | undefined): void => {
        const tab = i === Tabs.Opinion ? 'opinion' : 'characteristics'
        if (value) setProductTab(tab)
        else if (tabs === tab) setProductTab(null)
    }

    useEffect(() => {
        if (tabs !== 'characteristics' && tabs !== 'opinion') return
        const frame = requestAnimationFrame(() => {
            containerRef.current?.scrollIntoView({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                    ? 'instant'
                    : 'smooth',
            })
        })
        return () => cancelAnimationFrame(frame)
    }, [tabs])
    return (
        <Grid.Container gap={2} sm>
            <Grid xs={12} ref={containerRef}>
                <Collapse.Group splitted>
                    <Collapse
                        title="Характеристики"
                        expanded={tabs === 'characteristics'}
                        onChange={(_, i, value) => onChangeCollapse(i, value)}
                    >
                        <Product.Description />
                    </Collapse>
                    <Collapse
                        title="Отзывы"
                        index={2}
                        expanded={tabs === 'opinion'}
                        onChange={(_, i, value) => onChangeCollapse(i, value)}
                    >
                        <Product.Reviews />
                    </Collapse>
                </Collapse.Group>
            </Grid>
        </Grid.Container>
    )
}

export default DetailedProductInfo
