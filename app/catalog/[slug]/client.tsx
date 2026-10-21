'use client'

import dynamic from 'next/dynamic'

const CatalogPage = dynamic(() => import('@/_pages/CatalogPage'), { ssr: false })

export default CatalogPage
