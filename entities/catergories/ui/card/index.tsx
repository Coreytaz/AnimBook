/* eslint-disable @next/next/no-img-element -- Catalog images use variable external sources. */
import { Card } from '@heroui/react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { CatergoriesListProps } from '@/shared/api'
export function CatergoriesCard({ name, description, img, slug }: CatergoriesListProps) {
    return (
        <Card className="category-card">
            <Link href={`/catalog/${slug}`} className="category-link">
                <div className="category-art">
                    <img src={img} alt="" loading="lazy" />
                    <span className="category-arrow">
                        <ArrowUpRight size={21} />
                    </span>
                </div>
                <div className="category-copy">
                    <h3>{name}</h3>
                    <p>{description}</p>
                </div>
            </Link>
        </Card>
    )
}
