import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const OrderInfoPage = dynamic(() => import('@/_pages/OrderInfoPage'), { ssr: false })

export const metadata: Metadata = {
    title: 'Заказ',
}

const Page = () => {
    return <OrderInfoPage />
}

export default Page
