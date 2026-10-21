'use client'

import dynamic from 'next/dynamic'

const CheckoutPage = dynamic(() => import('@/_pages/CheckoutPage'), { ssr: false })

export default CheckoutPage
