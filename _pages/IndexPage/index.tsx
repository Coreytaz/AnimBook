'use client'
import Link from 'next/link'
import { ArrowRight, BookOpen, Heart, Sparkles } from 'lucide-react'
import type { ApiBannerData } from './sections/banner/api/types'
import type { ApiCatergoriesData } from '@/entities/catergories/api/types'
import Banner from './sections/banner'
import Catergories from './sections/catergories'
import ViewProduct from './sections/viewProduct'
export default function IndexPage({
    banners,
    categories,
}: {
    banners: ApiBannerData[]
    categories: ApiCatergoriesData[]
}) {
    return (
        <div className="home-page">
            <Banner items={banners} />
            <Catergories items={categories} />
            <section className="discovery-strip">
                <div className="discovery-icon">
                    <Sparkles size={28} />
                </div>
                <div>
                    <span className="eyebrow">Место для новых открытий</span>
                    <h2>Ваша следующая любимая история — здесь</h2>
                    <p>Манга, комиксы и книги для тех, кто любит другие миры.</p>
                </div>
                <Link href="/catalog" className="button button--secondary">
                    Найти свою книгу <ArrowRight size={18} />
                </Link>
            </section>
            <ViewProduct />
            <div className="home-notes">
                <span>
                    <BookOpen size={18} /> Истории на любой вкус
                </span>
                <span>
                    <Heart size={18} /> Сохраняйте любимое
                </span>
                <span>
                    <Sparkles size={18} /> Открывайте новые миры
                </span>
            </div>
        </div>
    )
}
