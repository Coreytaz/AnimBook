'use client'

import { useActionCart } from '@/entities/cart'
import { Button, Card, Skeleton } from '@heroui/react'
import { ArrowRight, BookOpen, Check, Clock3, PackageCheck, XCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { orderApi } from './api'
import styles from './styles.module.css'

export default function ResultPage() {
    const params = useParams<{ orderId: string }>()
    const router = useRouter()
    const { clearAllCart } = useActionCart()
    const {
        data: order,
        isLoading,
        isError,
        isSuccess,
    } = orderApi.useGetOrderStatusQuery(params?.orderId ?? '', { skip: !params?.orderId })

    useEffect(() => {
        if (order?.status === 'succeeded' && isSuccess) clearAllCart()
    }, [clearAllCart, isSuccess, order?.status])

    const succeeded = order?.status === 'succeeded'
    const pending = order?.status === 'pending'
    const failed = isError || (!isLoading && !succeeded && !pending)
    const Icon = failed ? XCircle : succeeded ? Check : Clock3
    const paymentUrl = pending ? order?.confirmation?.confirmation_url : undefined

    return (
        <section className={styles.page} aria-label="Результат оформления заказа">
            <Card className={styles.card}>
                {isLoading ? (
                    <div
                        className={styles.loading}
                        role="status"
                        aria-label="Проверяем оплату заказа"
                    >
                        <Skeleton className="h-20 w-20 rounded-full" />
                        <Skeleton className="h-9 w-3/4 rounded-xl" />
                        <Skeleton className="h-12 w-full rounded-xl" />
                        <Skeleton className="h-24 w-full rounded-xl" />
                        <Skeleton className="h-12 w-full rounded-xl" />
                        <span className="sr-only">Проверяем оплату заказа…</span>
                    </div>
                ) : (
                    <>
                        <div className={styles.heading} role="status">
                            <span
                                className={`${styles.icon} ${failed ? styles.error : succeeded ? styles.success : styles.pending}`}
                            >
                                <Icon size={36} strokeWidth={1.8} aria-hidden="true" />
                            </span>
                            <span className={styles.eyebrow}>
                                {failed
                                    ? 'Статус заказа'
                                    : succeeded
                                      ? 'Оплата прошла успешно'
                                      : 'Остался один шаг'}
                            </span>
                            <h1>
                                {failed
                                    ? 'Заказ не найден'
                                    : succeeded
                                      ? 'Спасибо за заказ!'
                                      : 'Заказ ожидает оплаты'}
                            </h1>
                            <p>
                                {failed
                                    ? 'Не удалось получить информацию о заказе. Проверьте его в личном кабинете.'
                                    : succeeded
                                      ? 'Ваши новые истории уже на шаг ближе. Заказ оплачен и оформлен.'
                                      : 'Заказ создан. Завершите оплату, чтобы мы могли начать его готовить.'}
                            </p>
                        </div>
                        <div className={styles.order}>
                            <span>Номер заказа</span>
                            <strong>{params?.orderId}</strong>
                        </div>
                        {succeeded && (
                            <div className={styles.note}>
                                <PackageCheck size={23} aria-hidden="true" />
                                <div>
                                    <h2>Теперь дело за нами</h2>
                                    <p>
                                        Ожидайте доставку в срок, указанный в заказе. Детали заказа
                                        доступны в личном кабинете.
                                    </p>
                                </div>
                            </div>
                        )}
                        <div className={styles.actions}>
                            <Button
                                size="lg"
                                fullWidth
                                onPress={() => {
                                    if (paymentUrl) window.location.assign(paymentUrl)
                                    else router.push('/profile')
                                }}
                            >
                                {paymentUrl
                                    ? 'Перейти к оплате'
                                    : failed
                                      ? 'В личный кабинет'
                                      : 'Перейти к заказу'}
                                <ArrowRight size={18} aria-hidden="true" />
                            </Button>
                            <Button
                                size="lg"
                                variant="secondary"
                                fullWidth
                                onPress={() => router.push('/catalog')}
                            >
                                <BookOpen size={18} aria-hidden="true" /> Вернуться в каталог
                            </Button>
                        </div>
                    </>
                )}
            </Card>
            <p className={styles.signature}>AnimBook · Истории, которые остаются</p>
        </section>
    )
}
