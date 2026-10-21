'use client'

import dynamic from 'next/dynamic'

const OrderInfoPage = dynamic(() => import('@/_pages/OrderInfoPage'), { ssr: false })

export default OrderInfoPage
