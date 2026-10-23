/* eslint-disable @next/next/no-img-element -- Catalog images use variable external sources. */
'use client'
import { Button } from '@heroui/react'
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import type { CarouselItemProps } from '@/shared/api'
export default function Carousel({ items }: { items: CarouselItemProps[]; delay?: number }) {
    const [active, setActive] = useState(0)
    const item = items[active % Math.max(1, items.length)]
    return (
        <section className="hero" aria-roledescription="карусель" aria-label="Подборки AnimBook">
            <div className="hero-copy">
                <span className="hero-tag">
                    <Sparkles size={14} /> Для тех, кто любит читать
                </span>
                <h1>{item?.caption || 'Новая глава вашей истории'}</h1>
                <p>
                    Откройте мир манги, комиксов и удивительных приключений. Найдите историю,
                    которую захочется перечитать.
                </p>
                <Link className="button button--primary hero-cta" href={item?.url || '/catalog'}>
                    Исследовать коллекцию <ArrowRight size={19} />
                </Link>
                <span className="hero-footnote">Ещё один мир ждёт вас на книжной полке</span>
            </div>
            <div className="hero-art" aria-hidden="true">
                {item?.img ? (
                    <>
                        <img src={item.img} alt="" className="hero-image" />
                    </>
                ) : (
                    <div className="hero-books">
                        <div>
                            冒険<small>ADVENTURE</small>
                        </div>
                        <div>
                            物語<small>STORIES</small>
                        </div>
                        <div>
                            夢<small>DREAMS</small>
                        </div>
                    </div>
                )}
                <span className="hero-art-label">読む · 想像する · 夢見る</span>
            </div>
            {items.length > 1 && (
                <div className="hero-controls">
                    <span>
                        {String(active + 1).padStart(2, '0')}{' '}
                        <span>/ {String(items.length).padStart(2, '0')}</span>
                    </span>
                    <Button
                        variant="ghost"
                        isIconOnly
                        aria-label="Предыдущая подборка"
                        onPress={() => setActive((active - 1 + items.length) % items.length)}
                    >
                        <ChevronLeft size={20} />
                    </Button>
                    <Button
                        variant="ghost"
                        isIconOnly
                        aria-label="Следующая подборка"
                        onPress={() => setActive((active + 1) % items.length)}
                    >
                        <ChevronRight size={20} />
                    </Button>
                </div>
            )}
        </section>
    )
}
