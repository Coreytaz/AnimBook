import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const IndexPage = dynamic(() => import('@/_pages/IndexPage'), {
    ssr: false,
})

export const metadata: Metadata = {
    title: 'AnimBook',
}

export default function Home() {
    return <IndexPage />
}
