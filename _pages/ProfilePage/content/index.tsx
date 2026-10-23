import { TOPIC_DELIVERY, TOPIC_BUY } from '@/widgets/header'
import { Card, Skeleton, Button } from '@heroui/react'
import { deliveriesApi, deliveriedApi } from './section/api'
import { useSession } from 'next-auth/react'
import { Section } from './section'
import styles from '../styles.module.css'

export default function Content() {
    const { data: session } = useSession()
    const userId = session?.user?.id
    const deliveries = deliveriesApi.useGetDeliveriesStatusQuery(userId ?? '', { skip: !userId })
    const purchases = deliveriedApi.useGetDeliveriedStatusQuery(userId ?? '', { skip: !userId })
    return (
        <div className={styles.orders}>
            {[
                { topic: TOPIC_DELIVERY, query: deliveries },
                { topic: TOPIC_BUY, query: purchases },
            ].map(({ topic, query }) =>
                query.isLoading || !userId ? (
                    <Card
                        key={topic.id}
                        className={styles.orderSection}
                        role="status"
                        aria-label="Загружаем заказы"
                    >
                        <Skeleton className="h-6 w-40 rounded-lg" />
                        <Skeleton className="mt-6 h-36 w-full rounded-xl" />
                    </Card>
                ) : query.isError ? (
                    <Card key={topic.id} className={styles.orderSection}>
                        <h2>{topic.fullTitle}</h2>
                        <p className={styles.description} role="alert">
                            Не удалось загрузить заказы.
                        </p>
                        <Button
                            variant="secondary"
                            className="mt-4"
                            onPress={() => {
                                void query.refetch()
                            }}
                        >
                            Попробовать снова
                        </Button>
                    </Card>
                ) : (
                    <Section
                        key={topic.id}
                        id={topic.id}
                        title={topic.fullTitle}
                        items={query.data ?? []}
                        Icon={topic.icon}
                    />
                )
            )}
        </div>
    )
}
