import { Button, Card, Chip } from '@heroui/react'
import { Star } from 'lucide-react'
import { Cart } from '@/features/cart'
import { Fav } from '@/features/fav'
import { Product } from '@/features/product'
import { toRub, type ProductProps } from '@/shared'
import { setProductTab } from '@/shared/lib/productTabs'
export function ProductCard({ _id, price, rating, img, discription }: ProductProps) {
    const average = rating?.reduce((sum, value) => sum + value.rating, 0) / rating?.length || 0
    return (
        <Card className="product-detail">
            <div className="product-gallery">
                <Product.ImageSlider imageCollection={img} />
            </div>
            <div className="product-details-copy">
                <Chip color="accent" variant="soft">
                    <Chip.Label>В вашей следующей главе</Chip.Label>
                </Chip>
                <strong className="product-detail-price">{toRub.format(price)}</strong>
                <Button
                    variant="ghost"
                    className="product-review-link"
                    onPress={() => setProductTab('opinion')}
                >
                    <Star size={17} /> {average ? average.toFixed(1) : 'Пока без оценок'} · Отзывы
                </Button>
                <p className="product-blurb">{discription}</p>
                <div className="product-purchase">
                    <Cart.Actions.AddProduct productId={_id} />
                    <Fav.Actions.AddProduct productId={_id} />
                </div>
            </div>
        </Card>
    )
}
