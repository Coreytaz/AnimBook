import { Card } from '@heroui/react'
import { PackageOpen, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { BadgeStatus } from '@/entities/BadgeStatus'
import { ApiDeliveriesData } from './api'
import styles from '../../styles.module.css'

type Props = {
    id: string
    title: ReactNode
    description?: ReactNode
    Icon: LucideIcon
    items: ApiDeliveriesData[]
}

export function Section({ id, title, description, items, Icon }: Props) {
    return (
        <Card id={id} className={styles.orderSection}>
            <div className={styles.orderHeading}>
                <Icon size={22} aria-hidden="true" />
                <h2>{title}</h2>
                <span className={styles.count}>{items.length}</span>
            </div>
            {description && <p className={styles.description}>{description}</p>}
            {items.length ? (
                <div className={styles.orderList}>
                    {items.map((item) => (
                        <Link
                            key={item._id}
                            href={`/profile/${item._id}`}
                            className={styles.orderLink}
                        >
                            <strong>Заказ №{item._id}</strong>
                            <span>{item.address || 'Адрес не указан'}</span>
                            <BadgeStatus text={item.status} />
                        </Link>
                    ))}
                </div>
            ) : (
                <div className={styles.empty}>
                    <PackageOpen size={32} strokeWidth={1.4} aria-hidden="true" />
                    <h3>
                        {id === 'delivery' ? 'Пока нет доставок' : 'Здесь появятся ваши покупки'}
                    </h3>
                    <p>
                        {id === 'delivery'
                            ? 'Когда заказ отправится к вам, он появится здесь.'
                            : 'Найдите новую историю — мы сохраним ваши заказы здесь.'}
                    </p>
                    <Link href="/catalog" className={styles.catalog}>
                        Открыть каталог →
                    </Link>
                </div>
            )}
        </Card>
    )
}
