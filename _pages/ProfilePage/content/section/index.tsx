import type { ReactNode } from 'react'
import cn from 'clsx'
import { Badge, Card, Col, Row, Text } from '@nextui-org/react'
import styles from './styles.module.scss'
import { Check } from 'lucide-react'
import { useScrollVertical } from '@/shared/helpers'
import { ApiDeliveriesData } from './api'
import { useRouter } from 'next/navigation'
import { BadgeStatus } from '@/entities/BadgeStatus'

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
    items: T[]
    active?: boolean
}

export function Section<T extends ApiDeliveriesData>(props: Props<T>) {
    const router = useRouter()
    const { title, description, items, Icon, id, titleAfter, active } = props
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
                {items?.length > 0 ? (
                    items.map((item) => (
                        <Col css={{ width: '242px' }} key={item._id}>
                            <Card
                                className={styles.card}
                                isHoverable
                                isPressable
                                onClick={() => router.push(`profile/${item._id}`)}
                            >
                                <Card.Header>
                                    <Text css={{ textAlign: 'center' }} b>
                                        Заказа №<Text size="$xs">{item._id}</Text>
                                    </Text>
                                </Card.Header>
                                <Card.Body>
                                    <Text b>
                                        Адрес:<Text>{item.address}</Text>
                                    </Text>
                                </Card.Body>
                                <Card.Footer css={{ jc: 'center' }}>
                                    <BadgeStatus text={item.status} />
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))
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
