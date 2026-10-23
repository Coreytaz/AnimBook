/* eslint-disable @next/next/no-img-element -- Catalog images use variable external sources. */
'use client'
import { Card } from '@heroui/react'
import Link from 'next/link'
import { toRub } from '@/shared'
import type { ProductProps } from '@/shared/api'
import type { ReactNode } from 'react'
type Props = { data: ProductProps; className?: string; actions?: ReactNode }
export default function ProductRow({ data, actions, className }: Props) {
    return (
        <div className={['book-row', className].filter(Boolean).join(' ')}>
            <Link href={`/product/${data.slug}`} className="book-row-link">
                <img src={data.img[0]?.src} alt={data.img[0]?.alt || data.name} loading="lazy" />
                <div>
                    <span className="book-type">{data.type || 'Книжная коллекция'}</span>
                    <h3>{data.name}</h3>
                    <strong>{toRub.format(data.price)}</strong>
                </div>
            </Link>
            <div className="book-row-actions">{actions}</div>
        </div>
    )
}
export function ProductRowCard(props: Props) {
    return (
        <Card className="book-row-card">
            <ProductRow {...props} />
        </Card>
    )
}
