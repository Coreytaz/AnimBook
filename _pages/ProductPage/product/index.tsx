import { FC } from 'react'
import { Badge, Button, Card, Grid, Spacer, Text, Tooltip } from '@nextui-org/react'
import { HeartIcon } from './svg/HeardIcon'
import styles from './styles.module.scss'
import { StarRating } from '@/entities/StarRating'
import { Product } from '@/features/product'
import { usePathname, useRouter } from 'next/navigation'

const ProductContainer: FC = () => {
    return (
        <>
            <Text
                h2
                css={{
                    textGradient: '45deg, $blue600 10%, $pink600 100%',
                }}
                weight="bold"
            >
                Случайная фигурка Genshin Impact
            </Text>
            <ProductCard />
        </>
    )
}

const ProductCard: FC = () => {
    const router = useRouter()
    const pathname = usePathname()

    const dateImages = [
        {
            src: 'https://nextui.org/images/card-example-1.jpeg',
            alt: 'Card image background',
        },
        {
            src: 'https://nextui.org/images/card-example-2.jpeg',
            alt: 'Card image background',
        },
        {
            src: 'https://nextui.org/images/card-example-3.jpeg',
            alt: 'Card image background',
        },
        {
            src: 'https://nextui.org/images/card-example-4.jpeg',
            alt: 'Card image background',
        },
        {
            src: 'https://nextui.org/images/card-example-5.jpeg',
            alt: 'Card image background',
        },
        {
            src: 'https://nextui.org/images/card-example-6.jpeg',
            alt: 'Card image background',
        },
    ]

    return (
        <Card>
            <Grid.Container gap={2} justify="center" css={{ p: '$11' }}>
                <Grid xs={5} css={{ flexDirection: 'column', gap: '$10' }}>
                    <Product.ImageSlider imageCollection={dateImages} />
                </Grid>
                <Grid xs={7} css={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div className={styles.wrapperProduct}>
                        <div>
                            <Text b size="$3xl" span>
                                890.00 руб
                            </Text>
                        </div>
                        <div>
                            <Text css={{ mb: '$10' }}>
                                Случайная фигурка по игре Genshin Impact ! Вам может попасться один
                                из начальных персонажей , которые были с путешественником с самого
                                начала твоего пути в игре.
                            </Text>
                            <Badge
                                size="lg"
                                isSquared
                                color="warning"
                                variant="bordered"
                                onClick={() => router.push(`${pathname}?tabs=opinion`)}
                            >
                                <StarRating readOnly />
                            </Badge>
                        </div>
                        <div className={styles.buttonGroups}>
                            <Tooltip content={'Добавить в избранное'}>
                                <Button
                                    auto
                                    color="error"
                                    icon={<HeartIcon fill="currentColor" filled />}
                                />
                            </Tooltip>
                            <Button>Купить</Button>
                        </div>
                        <div>
                            <div className={styles.flex}>
                                <Badge color="success" variant="dot" />
                                <Text size="$xs">В наличии 1 шт</Text>
                            </div>
                            <div className={styles.flex}>
                                <Badge color="warning" variant="dot" />
                                <Text size="$xs">Доставка курьерской службой до 2 дней</Text>
                            </div>
                        </div>
                    </div>
                    <Spacer />
                </Grid>
            </Grid.Container>
        </Card>
    )
}

export default ProductContainer
