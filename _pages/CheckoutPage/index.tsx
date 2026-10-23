'use client'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Content } from './content'
export default function CheckoutPage() {
    return (
        <div className="checkout-page">
            <Link href="/cart" className="auth-back">
                <ArrowLeft size={16} /> Вернуться в корзину
            </Link>
            <div className="page-heading">
                <span className="eyebrow">Остался один шаг</span>
                <h1>Оформление заказа</h1>
                <p>Укажите данные покупателя и адрес доставки.</p>
            </div>
            <Content />
        </div>
    )
}
