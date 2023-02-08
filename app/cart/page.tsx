'use client'
import { Container } from '@nextui-org/react'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const CartPage = dynamic(() => import('@/_pages/CartPage'))

const Page = () => {
    return (
        <>
            <Head>
                <title>Каталог</title>
            </Head>
            <Container>
                <CartPage />
            </Container>
        </>
    )
}

export default Page
