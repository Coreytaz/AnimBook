'use client'

import dynamic from 'next/dynamic'

const CartPage = dynamic(() => import('@/_pages/CartPage'), { ssr: false })

export default CartPage
