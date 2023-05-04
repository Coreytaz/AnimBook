import dynamic from 'next/dynamic'

const CartPage = dynamic(() => import('@/_pages/CartPage'), { ssr: false })

const Page = () => {
    return <CartPage />
}

export default Page
