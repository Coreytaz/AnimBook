import { StarRating } from '@/entities/StarRating'
import { Cart } from '@/features/cart'
import { Fav } from '@/features/fav'
import { Product } from '@/features/product'
import { ProductProps, toRub } from '@/shared'
import { Card, Badge, Spacer, Grid, Text } from '@nextui-org/react'
import { usePathname, useRouter } from 'next/navigation'
import { FC } from 'react'
import styles from './styles.module.scss'

export const ProductCard: FC<ProductProps> = ({ _id, price, rating, img, discription }) => {
    const router = useRouter()
    const pathname = usePathname()

    const totalRating = rating?.reduce((acc, cur) => acc + cur.rating, 0) / rating?.length || 0

    return (
        <Card>
            <Grid.Container gap={2} justify="center" css={{ p: '$11' }}>
                <Grid xs={5} css={{ flexDirection: 'column', gap: '$10' }}>
                    <Product.ImageSlider imageCollection={img} />
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
                                <StarRating readOnly tooltip rating={totalRating} />
                            </Badge>
                        </div>
                        <div className={styles.buttonGroups}>
                            <Fav.Actions.AddProduct productId={_id} />
                            <Cart.Actions.AddProduct productId={_id} />
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
