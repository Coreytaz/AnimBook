import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const AuthPage = dynamic(() => import('@/_pages/AuthPage'), { ssr: false })

export const metadata: Metadata = {
    title: 'Авторизация',
}

const Page = () => {
    return <AuthPage />
}

export default Page
