import { Metadata } from 'next'
import CartPage from './client'


export const metadata: Metadata = {
    title: 'Корзина',
}

const Page = () => {
    return <CartPage />
}

export default Page
