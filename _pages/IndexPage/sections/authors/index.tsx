import { Avatar, Card, Container, Grid, Text } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

const items = [
    {
        name: 'Автор 1',
    },
    {
        name: 'Автор 2',
    },
    {
        name: 'Автор 3',
    },
    {
        name: 'Автор 4',
    },
    {
        name: 'Автор 5',
    },
    {
        name: 'Автор 6qweeweeeeeeeeeeeeeeeeeeeeeeeqweqweqweqe',
    },
]

const Authors = () => {
    const router = useRouter()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        router.push('/catalog')
    }

    return (
        <>
            <Container lg>
                <Text
                    h2
                    css={{
                        textAlign: 'center',
                        textGradient: '45deg, $blue600 10%, $pink600 100%',
                    }}
                    weight="bold"
                >
                    Популярные авторы
                </Text>
                <Grid.Container gap={2} justify="center">
                    {items.map((item, index) => (
                        <Grid
                            xs={12}
                            sm={2}
                            key={index}
                            css={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Card
                                isHoverable
                                variant="bordered"
                                onClick={handleClick}
                                css={{
                                    borderRadius: '$rounded',
                                    borderColor: '$primary',
                                    width: 128,
                                    height: 128,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                isPressable
                            >
                                <Text
                                    b
                                    css={{
                                        textAlign: 'center',
                                        maxW: 128,
                                        p: 10,
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {item.name}
                                </Text>
                            </Card>
                        </Grid>
                    ))}
                </Grid.Container>
            </Container>
        </>
    )
}

export default Authors
