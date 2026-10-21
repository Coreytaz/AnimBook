import { Metadata } from 'next'
import OrderInfoPage from './client'


export const metadata: Metadata = {
    title: 'Заказ',
}

const Page = () => {
    return <OrderInfoPage />
}

export default Page
