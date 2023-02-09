import { Card, Col, Container, Grid, Text } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

interface CatergoriesListProps {
    title: string
    description: string
    img: string
    altImg: string
}

const items = [
    {
        title: 'Категория 1',
        description: 'Описание категории 1',
        img: 'https://nextui.org/images/card-example-4.jpeg',
        altImg: 'placeholder',
    },
    {
        title: 'Категория 2',
        description: 'Описание категории 2',
        img: 'https://nextui.org/images/card-example-4.jpeg',
        altImg: 'placeholder',
    },
    {
        title: 'Категория 3',
        description: 'Описание категории 3',
        img: 'https://nextui.org/images/card-example-4.jpeg',
        altImg: 'placeholder',
    },
    {
        title: 'Категория 4',
        description: 'Описание категории 4',
        img: 'https://nextui.org/images/card-example-4.jpeg',
        altImg: 'placeholder',
    },
]

const Catergories: FC = () => {
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
                    Популярные категории
                </Text>
                <Grid.Container gap={2} justify="center">
                    {items.map((item, index) => (
                        <Grid xs={12} sm={3} key={index}>
                            <CatergoriesList {...item} />
                        </Grid>
                    ))}
                </Grid.Container>
            </Container>
        </>
    )
}
export default Catergories

export const CatergoriesList: FC<CatergoriesListProps> = ({ title, description, img, altImg }) => {
    const router = useRouter()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        router.push('/catalog')
    }
    return (
        <Card isPressable isHoverable variant="bordered" onClick={handleClick}>
            <Card.Header
                css={{
                    position: 'absolute',
                    zIndex: 1,
                    textAlign: 'center',
                    top: '50%',
                    transform: 'translateY(-50%)',
                }}
            >
                <Col>
                    <Text h3 color="white">
                        {title}
                    </Text>
                    <Text size={12} weight="bold" b transform="uppercase" color="#ffffffAA">
                        {description}
                    </Text>
                </Col>
            </Card.Header>
            <Card.Image
                css={{
                    filter: 'brightness(50%)',
                }}
                showSkeleton
                src={img}
                objectFit="cover"
                width="100%"
                height={240}
                alt={altImg}
            />
        </Card>
    )
}
