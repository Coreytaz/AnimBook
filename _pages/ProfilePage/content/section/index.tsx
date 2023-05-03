import type { ReactNode } from 'react'
import cn from 'clsx'
import { Card, Col, Row, Spacer, Text } from '@nextui-org/react'
import styles from './styles.module.scss'
import { ProductGridCard } from '@/entities/product'
import { ProductProps } from '@/shared'
import { Check } from 'lucide-react'
import { useScrollVertical } from '@/shared/helpers'

type Props<T> = {
    id: string
    title: ReactNode
    titleAfter?: ReactNode
    description?: ReactNode
    renderBookDetails?: (book: T, idx: number) => ReactNode
    renderBookActions?: (book: T, idx: number) => ReactNode[]
    getRibbonProps?: (
        book: T,
        idx: number
    ) => {
        text: ReactNode
        color: import('react').CSSProperties['color']
    }
    Icon: typeof Check
    product: T[]
    active?: boolean
}

export function Section<T extends ProductProps>(props: Props<T>) {
    const { title, description, product, Icon, id, titleAfter, active } = props
    const scrollVerticalRef = useScrollVertical()
    return (
        <Card
            className={cn(styles.root, { [styles.active]: active })}
            id={id}
            css={{
                p: '$14',
                mb: '$14',
                br: '$2xl',
            }}
        >
            <Row justify="space-between">
                <Text h3 className={styles.title}>
                    <a href={`#${id}`}>#</a>
                    {title} <Icon style={{ color: 'gray', fontSize: 20 }} />
                </Text>
                {titleAfter}
            </Row>
            <Text className={styles.description} color="primary">
                {description}
            </Text>
            <div className={styles.list} ref={scrollVerticalRef}>
                {product.length > 0 ? (
                    <Row gap={1} css={{ m: 0 }}>
                        {product.map((prod, idx) => (
                            <Col key={prod._id}>
                                <ProductGridCard data={prod} className={styles.card} />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <>
                        <Text h2 className={styles.placeholder}>
                            Пусто 😔
                        </Text>
                    </>
                )}
            </div>
        </Card>
    )
}
