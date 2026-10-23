/* eslint-disable @next/next/no-img-element -- Catalog images use variable external sources. */
'use client'
import { Card } from '@heroui/react'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { toRub } from '@/shared'
import type { ProductProps } from '@/shared/api'
import type { CardProps } from '@/shared/ui-kit'
import type { ReactNode } from 'react'
type Props = { data: ProductProps; className?: string; actions?: ReactNode } & Omit<
    CardProps,
    'children'
>
export const ProductGridCard = ({ data, actions }: Props) => {
    const rating =
        data.rating?.reduce((sum, value) => sum + value.rating, 0) / data.rating?.length || 0
    return (
        <>
            <Link href={`/product/${data.slug}`} className="book-link">
                <div className="book-cover">
                    <img
                        src={data.img[0]?.src}
                        alt={data.img[0]?.alt || data.name}
                        loading="lazy"
                    />
                </div>
                <div className="book-info">
                    <span className="book-type">{data.type || 'Книжная коллекция'}</span>
                    <h3>{data.name}</h3>
                    <div className="book-meta">
                        <strong>{toRub.format(data.price)}</strong>
                        <span>
                            <Star size={14} fill="currentColor" />{' '}
                            {rating ? rating.toFixed(1) : 'Нет оценок'}
                        </span>
                    </div>
                </div>
            </Link>
            {actions && <Card.Footer className="book-actions">{actions}</Card.Footer>}
        </>
    )
}
export default function ProductCard(props: Props) {
    return (
        <Card className={['book-card', props.className].filter(Boolean).join(' ')}>
            <ProductGridCard {...props} />
        </Card>
    )
}
