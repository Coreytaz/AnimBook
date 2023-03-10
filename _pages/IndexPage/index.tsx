'use client'
import { Container, Spacer } from '@nextui-org/react'
import { FC } from 'react'
import Authors from './sections/authors'
import Banner from './sections/banner'
import Catergories from './sections/catergories'

const IndexPage: FC = () => {
    return (
        <Container>
            <Banner />
            <Spacer y={2} />
            <Catergories />
            <Spacer y={2} />
            <Authors />
        </Container>
    )
}

export default IndexPage
