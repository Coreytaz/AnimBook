import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const CheckoutPage = dynamic(() => import('@/_pages/CheckoutPage'), { ssr: false })

export const metadata: Metadata = {
    title: 'Оформление заказа',
}

const Page = () => {
    return <CheckoutPage />
}

export default Page
