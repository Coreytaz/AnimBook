'use client'
import { Container, Grid, Text } from '@nextui-org/react'
import { FC } from 'react'
import Aside from './aside'
import Content from './content'

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
            <Grid.Container gap={2}>
                <Grid>
                    <Aside />
                </Grid>
                <Grid xs={7}>
                    <Content />
                </Grid>
            </Grid.Container>
        </Container>
    )
}

export default ProfilePage
