import { FC, memo, use } from 'react'
import { Badge, Button, Card, Grid, Spacer, Text, Tooltip } from '@nextui-org/react'
import { HeartIcon } from './svg/HeardIcon'
import styles from './styles.module.scss'
import { StarRating } from '@/entities/StarRating'
import { Product } from '@/features/product'
import { usePathname, useRouter } from 'next/navigation'
import { ProductProps } from '@/shared/api'
import { toRub } from '@/shared'

async function getData(slug: string): Promise<ProductProps> {
    const res = await fetch(
        'http://localhost:3000/api/getOneProduct?' +
            new URLSearchParams({
                slug,
            })
    )
    return res.json()
}

export default memo(function ProductContainer({ slug }: { slug: string }) {
    const product = use(getData(slug))
    return (
        <>
            <Text
                h2
                css={{
                    textGradient: '45deg, $blue600 10%, $pink600 100%',
                }}
                weight="bold"
            >
                {product?.name}
            </Text>
            <ProductCard {...product} />
        </>
    )
})

const ProductCard: FC<ProductProps> = ({ price, rating, img, discription }) => {
    const router = useRouter()
    const pathname = usePathname()

    const dateImages = [
        {
            src: img,
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
                                {toRub.format(price)}
                            </Text>
                        </div>
                        <div>
                            <Text css={{ mb: '$10' }}>{discription}</Text>
                            <Badge
                                size="lg"
                                isSquared
                                color="warning"
                                variant="bordered"
                                onClick={() => router.push(`${pathname}?tabs=opinion`)}
                            >
                                <StarRating readOnly tooltip defaultState={rating} />
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
