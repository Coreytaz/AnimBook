/* eslint-disable @next/next/no-img-element -- Product covers use variable external sources. */
'use client'

import { Button, Card, Chip, Skeleton } from '@heroui/react'
import {
    ArrowLeft,
    ArrowUpRight,
    BookOpen,
    CalendarDays,
    MapPin,
    Package,
    PackageOpen,
    Truck,
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getOrderiesApi } from './api'
import styles from './styles.module.css'

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
})

export default function OrderInfoPage() {
    const params = useParams<{ orderId: string }>()
    const {
        data: order,
        isLoading,
        isError,
        refetch,
    } = getOrderiesApi.useGetOrderStatusQuery(params?.orderId ?? '', { skip: !params?.orderId })
    const createdAt = order?.created_at ? new Date(order.created_at) : null
    const date =
        createdAt && !Number.isNaN(createdAt.getTime()) ? dateFormatter.format(createdAt) : null
    const items = order?.items ?? []
    const quantity = items.reduce((total, item) => total + item.quantity, 0)
    const statusColor =
        order?.status === 'Доставлен'
            ? 'success'
            : order?.status === 'Ожидает оплаты'
              ? 'warning'
              : 'accent'

    return (
        <main className={styles.page}>
            <Link href="/profile" className={styles.back}>
                <ArrowLeft size={16} aria-hidden="true" /> В личный кабинет
            </Link>
            {isLoading || !params?.orderId ? (
                <div role="status" aria-label="Загружаем заказ" className={styles.loading}>
                    <Skeleton className="h-10 w-56 rounded-xl" />
                    <Skeleton className="h-5 w-full max-w-sm rounded-lg" />
                    <div className={styles.layout}>
                        <Skeleton className="h-72 w-full rounded-3xl" />
                        <Skeleton className="h-96 w-full rounded-3xl" />
                    </div>
                </div>
            ) : isError || !order ? (
                <Card className={styles.error}>
                    <PackageOpen size={44} strokeWidth={1.5} aria-hidden="true" />
                    <h1>Не удалось загрузить заказ</h1>
                    <p>Попробуйте ещё раз или вернитесь к списку заказов в личном кабинете.</p>
                    <Button
                        onPress={() => {
                            void refetch()
                        }}
                    >
                        Попробовать снова
                    </Button>
                </Card>
            ) : (
                <>
                    <header className={styles.header}>
                        <div className={styles.titleRow}>
                            <h1>Ваш заказ</h1>
                            <Chip color={statusColor} variant="soft">
                                <Chip.Label>{order.status || 'Статус уточняется'}</Chip.Label>
                            </Chip>
                        </div>
                        <p className={styles.number}>№ {order._id}</p>
                        {date && (
                            <p className={styles.date}>
                                <CalendarDays size={15} aria-hidden="true" /> Оформлен {date}
                            </p>
                        )}
                    </header>
                    <div className={styles.layout}>
                        <aside className={styles.aside}>
                            <Card className={styles.panel}>
                                <div className={styles.panelHeading}>
                                    <span className={styles.icon}>
                                        <Truck size={21} aria-hidden="true" />
                                    </span>
                                    <h2>Доставка</h2>
                                </div>
                                <dl className={styles.details}>
                                    <div className={styles.address}>
                                        <dt>
                                            <MapPin size={15} aria-hidden="true" /> Адрес доставки
                                        </dt>
                                        <dd>{order.address || 'Не указан'}</dd>
                                    </div>
                                    <div>
                                        <dt>Почтовый индекс</dt>
                                        <dd>{order.postIndex || 'Не указан'}</dd>
                                    </div>
                                    <div>
                                        <dt>Квартира</dt>
                                        <dd>{order.apartaments || 'Не указана'}</dd>
                                    </div>
                                </dl>
                            </Card>
                            <div className={styles.note}>
                                <BookOpen size={20} aria-hidden="true" />
                                <p>
                                    Все ваши заказы всегда под рукой — в личном кабинете AnimBook.
                                </p>
                            </div>
                        </aside>
                        <Card className={styles.panel}>
                            <div className={styles.panelHeading}>
                                <span className={styles.icon}>
                                    <Package size={21} aria-hidden="true" />
                                </span>
                                <h2>Состав заказа</h2>
                                <span className={styles.count}>{quantity} шт.</span>
                            </div>
                            {items.length ? (
                                <ul className={styles.products}>
                                    {items.map((item) => (
                                        <li key={item._id}>
                                            <Link
                                                href={`/product/${item.product.slug}`}
                                                className={styles.product}
                                            >
                                                <span className={styles.cover}>
                                                    {item.product.img?.[0]?.src ? (
                                                        <img
                                                            src={item.product.img[0].src}
                                                            alt={
                                                                item.product.img[0].alt ||
                                                                item.product.name
                                                            }
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <BookOpen size={28} aria-hidden="true" />
                                                    )}
                                                </span>
                                                <span className={styles.productInfo}>
                                                    <span className={styles.type}>
                                                        {item.product.type || 'Книга'}
                                                    </span>
                                                    <strong>{item.product.name}</strong>
                                                    <span className={styles.quantity}>
                                                        Количество: {item.quantity} шт.
                                                    </span>
                                                </span>
                                                <ArrowUpRight
                                                    className={styles.arrow}
                                                    size={19}
                                                    aria-hidden="true"
                                                />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className={styles.empty}>
                                    <PackageOpen size={32} aria-hidden="true" />
                                    <p>Список товаров пока недоступен.</p>
                                </div>
                            )}
                            <div className={styles.footer}>
                                <span>Новая история начинается с книги</span>
                                <Link href="/catalog">
                                    В каталог <ArrowUpRight size={15} aria-hidden="true" />
                                </Link>
                            </div>
                        </Card>
                    </div>
                </>
            )}
        </main>
    )
}
