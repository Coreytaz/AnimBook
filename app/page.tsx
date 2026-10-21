import { Metadata } from 'next'
import IndexPage from './client'


export const metadata: Metadata = {
    title: 'AnimBook',
}

export default function Home() {
    return <IndexPage />
}
