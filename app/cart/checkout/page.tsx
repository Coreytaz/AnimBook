import dynamic from 'next/dynamic'

const CheckoutPage = dynamic(() => import('@/_pages/CheckoutPage'), { ssr: false })

const Page = () => {
    return <CheckoutPage />
}

export default Page
