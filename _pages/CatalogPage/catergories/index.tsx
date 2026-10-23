import { CatergoriesCard } from '@/entities/catergories'
import type { ApiCatergoriesData } from '@/entities/catergories/api/types'
export default function Catergories({ items }: { items: ApiCatergoriesData[] }) {
    return (
        <section>
            <div className="page-heading">
                <span className="eyebrow">Ваша книжная вселенная</span>
                <h1>Каталог</h1>
                <p>Выберите жанр и отправляйтесь навстречу новой истории.</p>
            </div>
            <div className="category-grid">
                {items.map((item) => (
                    <CatergoriesCard key={item._id} {...item} />
                ))}
            </div>
            {!items.length && <p className="empty-note">В этой коллекции пока нет категорий.</p>}
        </section>
    )
}
