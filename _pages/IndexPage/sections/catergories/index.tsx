import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CatergoriesCard } from '@/entities/catergories'
import type { ApiCatergoriesData } from '@/entities/catergories/api/types'
export default function Catergories({ items }: { items: ApiCatergoriesData[] }) {
    return (
        <section className="category-section">
            <div className="section-heading">
                <div>
                    <span className="eyebrow">С чего начнём?</span>
                    <h2>Выберите свой мир</h2>
                </div>
                <Link href="/catalog" className="text-link">
                    Весь каталог <ArrowUpRight size={18} />
                </Link>
            </div>
            {items.length ? (
                <div className="category-grid">
                    {items.map((item) => (
                        <CatergoriesCard key={item._id} {...item} />
                    ))}
                </div>
            ) : (
                <p className="empty-note">Категории скоро появятся. Загляните к нам чуть позже.</p>
            )}
        </section>
    )
}
