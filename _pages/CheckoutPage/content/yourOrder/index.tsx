import { useActionOrder, useOrder, useTotalCart } from '@/entities/cart'
import { Card, Skeleton } from '@heroui/react'
import { toRub } from '@/shared/helpers'
import Link from 'next/link'
import { useEffect } from 'react'
export function YourOrder() {
    const { getOrderProduct } = useActionOrder()
    const { products, productIdsKey } = useOrder()
    const count = useTotalCart()
    useEffect(() => {
        getOrderProduct()
    }, [productIdsKey, getOrderProduct])
    return (
        <Card className="checkout-order">
            <div className="checkout-order-heading">
                <h2>
                    Ваш заказ <span>{count} шт.</span>
                </h2>
                <Link href="/cart" className="text-link">
                    Изменить
                </Link>
            </div>
            {products.status === 'loading' && !products.orderProduct.length ? (
                <Skeleton className="h-20 w-full rounded-xl" aria-label="Загружаем заказ" />
            ) : (
                <div className="checkout-order-list">
                    {products.orderProduct.map((product) => (
                        <div key={product._id} className="checkout-order-row">
                            <Link href={'/product/' + product.slug} className="checkout-order-book">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={product.img[0]?.src} alt="" />
                                <span>
                                    {product.name}
                                    <small>
                                        {product.count} шт. × {toRub.format(product.price)}
                                    </small>
                                </span>
                            </Link>
                            <strong>{toRub.format(product.count * product.price)}</strong>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    )
}
