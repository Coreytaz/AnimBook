import { CatergoriesListProps } from '@/shared/api'
import { Card, Col, Text } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

interface CatergoriesCardProps extends CatergoriesListProps {}

export const CatergoriesCard: FC<CatergoriesCardProps> = ({ name, description, img, slug }) => {
    const router = useRouter()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        router.push(`/catalog/${slug}`)
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
                        {name}
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
                alt={name}
            />
        </Card>
    )
}
