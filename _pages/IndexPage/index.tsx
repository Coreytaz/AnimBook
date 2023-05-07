'use client'
import { Container, Spacer } from '@nextui-org/react'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import Authors from './sections/authors'
import Banner from './sections/banner'
import Catergories from './sections/catergories'
import ViewProduct from './sections/viewProduct'

const IndexPage: FC = () => {
    const view = useSelector((state: any) => state.viewProductSlice)
    return (
        <Container>
            <Banner />
            <Spacer y={2} />
            <Catergories />
            <Spacer y={2} />
            <Authors />
            <Spacer y={2} />
            <ViewProduct />
        </Container>
    )
}

export default IndexPage
