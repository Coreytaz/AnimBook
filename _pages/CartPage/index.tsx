'use client'
import { Col, Container, Row } from '@nextui-org/react'
import { FC } from 'react'
import Content from './Content'
import Sidebar from './Sidebar'

const CartPage: FC = () => {
    return (
        <Container lg>
            <Row css={{ gap: '$5' }} wrap="wrap" justify="center">
                <Col
                    css={{
                        w: '100%',
                        '@xs': {
                            w: '100%',
                        },
                        '@sm': {
                            w: '65%',
                        },
                    }}
                >
                    <Content />
                </Col>
                <Col
                    css={{
                        w: '100%',
                        '@xs': {
                            w: '100%',
                        },
                        '@sm': {
                            w: '25%',
                        },
                    }}
                >
                    <Sidebar />
                </Col>
            </Row>
        </Container>
    )
}

export default CartPage
