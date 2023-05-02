import { Store, Truck } from 'lucide-react'

export const TOPIC_DELIVERY = {
    id: 'delivery',
    title: 'Доставки',
    icon: Truck,
    fullTitle: 'Мои доставки',
}

export const TOPIC_BUY = {
    id: 'buy',
    title: 'Покупки',
    fullTitle: 'Мои покупки',
    icon: Store,
    description: 'Оставьте отзыв на товаре',
}

export const topics = [TOPIC_DELIVERY, TOPIC_BUY]
