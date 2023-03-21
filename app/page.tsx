import dynamic from 'next/dynamic'

const IndexPage = dynamic(() => import('@/_pages/IndexPage'), {
    ssr: false,
})

export default function Home() {
    return <IndexPage />
}
