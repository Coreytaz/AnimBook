import { Metadata } from 'next'
import CheckoutPage from './client'


export const metadata: Metadata = {
    title: 'Оформление заказа',
}

const Page = () => {
    return <CheckoutPage />
}

export default Page
