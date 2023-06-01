import React, { useEffect } from 'react'
import { Section } from './section'
import { TOPIC_DELIVERY, TOPIC_BUY } from '@/widgets/header'
import { deliveriedApi, deliveriesApi } from './section/api'
import { useSession } from 'next-auth/react'
import { Loading } from '@nextui-org/react'
import { Skeleton } from '@/shared/ui'

const Content = () => {
    const { data: session } = useSession()
    const { data: deliveries, isLoading: deliveriesLoad } =
        deliveriesApi.useGetDeliveriesStatusQuery(session?.user?.id!)
    const { data: deliveried, isLoading: deliveriedLoad } =
        deliveriedApi.useGetDeliveriedStatusQuery(session?.user?.id!)

    if (deliveriesLoad || deliveriedLoad) {
        return (
            <section style={{ width: '100%' }}>
                <Skeleton style={{ height: '400px', marginBottom: '30px' }} />
                <Skeleton style={{ height: '400px' }} />
            </section>
        )
    }

    return (
        <section style={{ width: '100%' }}>
            <Section
                id={TOPIC_DELIVERY.id}
                title={TOPIC_DELIVERY.fullTitle}
                items={deliveries!}
                Icon={TOPIC_DELIVERY.icon}
            />
            <Section
                id={TOPIC_BUY.id}
                title={TOPIC_BUY.fullTitle}
                description={TOPIC_BUY.description}
                items={deliveried!}
                Icon={TOPIC_BUY.icon}
            />
        </section>
    )
}

export default Content
