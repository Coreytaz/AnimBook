import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const CartPage = dynamic(() => import('@/_pages/CartPage'), { ssr: false })

export const metadata: Metadata = {
    title: 'Корзина',
}

const Page = () => {
    return <CartPage />
}

export default Page
