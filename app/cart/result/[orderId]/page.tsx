import { Metadata } from 'next'
import ResultPage from './client'


export const metadata: Metadata = {
    title: 'Оформление заказа',
}

const Page = () => {
    return <ResultPage />
}

export default Page
