import { ProductGridCard, useGetViewProductsQuery } from '@/entities/product'
import { Cart } from '@/features/cart'
import { Fav } from '@/features/fav'
export default function ViewProduct() {
    const { data: products } = useGetViewProductsQuery()
    if (!products?.length) return null
    return (
        <section>
            <div className="section-heading">
                <div>
                    <span className="eyebrow">Продолжим знакомство</span>
                    <h2>Вы недавно смотрели</h2>
                </div>
            </div>
            <div className="recent-books">
                {products.map((data) => (
                    <ProductGridCard
                        key={data._id}
                        data={data}
                        actions={
                            <>
                                <Fav.Actions.AddBookMini productId={data._id} />
                                <Cart.Actions.AddBookMini productId={data._id} />
                            </>
                        }
                    />
                ))}
            </div>
        </section>
    )
}
