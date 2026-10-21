import { Metadata } from 'next'
import AuthPage from './client'


export const metadata: Metadata = {
    title: 'Авторизация',
}

const Page = () => {
    return <AuthPage />
}

export default Page
