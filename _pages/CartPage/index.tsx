'use client'
import { Col, Container, Row } from '@nextui-org/react'
import { FC } from 'react'
import Content from './Content'
import Sidebar from './Sidebar'

const CartPage: FC = () => {
    return (
        <Container lg>
            <Row gap={1}>
                <Col>
                    <Content />
                </Col>
                <Col span={4}>
                    <Sidebar />
                </Col>
            </Row>
        </Container>
    )
}

export default CartPage
