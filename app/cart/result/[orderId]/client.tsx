'use client'

import dynamic from 'next/dynamic'

const ResultPage = dynamic(() => import('@/_pages/ResultPage'), { ssr: false })

export default ResultPage
