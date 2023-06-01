import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const ResultPage = dynamic(() => import('@/_pages/ResultPage'), { ssr: false })

export const metadata: Metadata = {
    title: 'Оформление заказа',
}

const Page = () => {
    return <ResultPage />
}

export default Page
