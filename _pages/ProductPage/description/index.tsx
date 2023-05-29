import { Product } from '@/features/product'
import { Grid, Collapse, Text } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FC, useEffect, useRef } from 'react'

enum Tabs {
    Characteristics = 1,
    Opinion = 2,
}

const DetailedProductInfo: FC = () => {
    const containerRef = useRef<HTMLDivElement>(null!)
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const tabs = searchParams?.get('tabs')

    const onChangeCollapse = (i: number | undefined, value: boolean | undefined): void => {
        if (!value) {
            router.push(`${pathname}`)
            return
        }
        switch (i) {
            case Tabs.Characteristics:
                router.push(`${pathname}?tabs=characteristics`)
                break
            case Tabs.Opinion:
                router.push(`${pathname}?tabs=opinion`)
                break
            default:
                router.push(`${pathname}`)
                break
        }
    }

    useEffect(() => {
        // Костыль
        setTimeout(() => {
            if (searchParams?.has('tabs')) {
                containerRef.current.scrollIntoView({
                    behavior: 'smooth',
                })
            }
        }, 150)
    }, [searchParams])
    return (
        <Grid.Container gap={2} sm>
            <Grid ref={containerRef}>
                <Collapse.Group splitted>
                    <Collapse
                        title="Характиристики"
                        expanded={tabs === 'characteristics'}
                        onChange={(_, i, value) => onChangeCollapse(i, value)}
                    >
                        <Product.Description />
                    </Collapse>
                    <Collapse
                        title="Отзывы"
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
