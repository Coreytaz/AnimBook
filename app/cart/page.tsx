import dynamic from 'next/dynamic'

const CartPage = dynamic(() => import('@/_pages/CartPage'))

const Page = () => {
    return <CartPage />
}

export default Page
