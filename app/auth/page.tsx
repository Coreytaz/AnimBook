import dynamic from 'next/dynamic'

const AuthPage = dynamic(() => import('@/_pages/AuthPage'), { ssr: false })

const Page = () => {
    return <AuthPage />
}

export default Page
