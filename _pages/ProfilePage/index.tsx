'use client'
import { Container, Grid, Text } from '@nextui-org/react'
import { FC } from 'react'
import Aside from './aside'
import Content from './content'
import Sidebar from './sidebar'

const ProfilePage: FC = () => {
    return (
        <Container lg>
            <Text
                h2
                css={{
                    textGradient: '45deg, $blue600 10%, $pink600 100%',
                    mb: '$10',
                }}
                weight="bold"
            >
                Профиль
            </Text>
            <Grid.Container gap={2} justify="center">
                <Grid>
                    <Aside />
                </Grid>
                <Grid xs={7}>
                    <Content />
                </Grid>
                <Grid xs={1}>
                    <Sidebar />
                </Grid>
            </Grid.Container>
        </Container>
    )
}

export default ProfilePage
