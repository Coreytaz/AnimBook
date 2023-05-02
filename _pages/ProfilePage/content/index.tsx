import React, { useEffect } from 'react'
import { Section } from './section'
import { TOPIC_DELIVERY, TOPIC_BUY } from '@/widgets/header'
import { useActionFav, useFav } from '@/entities/fav'
import { Loading } from '@nextui-org/react'

const Content = () => {
    const { getFavProduct } = useActionFav()
    const { products, favoritesId } = useFav()

    useEffect(() => {
        getFavProduct()
    }, [favoritesId, getFavProduct])

    if (products.status === 'loading') {
        return (
            <Loading
                css={{
                    dflex: 'center',
                }}
            />
        )
    }

    return (
        <section style={{ width: '100%' }}>
            <Section
                id={TOPIC_DELIVERY.id}
                title={TOPIC_DELIVERY.fullTitle}
                product={products.favoritesItems}
                Icon={TOPIC_DELIVERY.icon}
            />
            <Section
                id={TOPIC_BUY.id}
                title={TOPIC_BUY.fullTitle}
                description={TOPIC_BUY.description}
                product={products.favoritesItems}
                Icon={TOPIC_BUY.icon}
            />
        </section>
    )
}

export default Content
