'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, Heart, LayoutGrid, ShoppingBag, House } from 'lucide-react'
import { useTotalFav } from '@/entities/fav'
import { useTotalCart } from '@/entities/cart'
import Search from './search'
import Profile from './Profile'

export default function Header() {
    const pathname = usePathname() || '/'
    const fav = useTotalFav()
    const cart = useTotalCart()
    const actions = [
        { href: '/', label: 'Главная', Icon: House, count: 0, home: true },
        { href: '/catalog', label: 'Каталог', Icon: LayoutGrid, count: 0 },
        { href: '/fav', label: 'Избранное', Icon: Heart, count: fav },
        { href: '/cart', label: 'Корзина', Icon: ShoppingBag, count: cart },
    ]
    return (
        <>
            <header className="site-header">
                <div className="header-inner">
                    <Link href="/" className="brand" aria-label="AnimBook — на главную">
                        <span className="brand-mark">
                            <BookOpen size={24} />
                        </span>
                        <span>
                            Anim<span className="brand-accent">Book</span>
                            <small>Истории, которые остаются</small>
                        </span>
                    </Link>
                    <div className="header-search">
                        <Search />
                    </div>
                    <div className="header-controls">
                        <nav className="header-actions" aria-label="Основная навигация">
                            {actions
                                .filter((a) => !a.home)
                                .map(({ href, label, Icon, count }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        className="header-action"
                                        aria-current={
                                            pathname.startsWith(href) ? 'page' : undefined
                                        }
                                    >
                                        <span className="action-icon">
                                            <Icon size={21} />
                                            {count > 0 && (
                                                <span className="action-count">{count}</span>
                                            )}
                                        </span>
                                        <span>{label}</span>
                                    </Link>
                                ))}
                        </nav>
                        <div className="header-profile">
                            <Profile />
                        </div>
                    </div>
                </div>
            </header>
            <nav className="mobile-nav" aria-label="Мобильная навигация">
                {actions.map(({ href, label, Icon, count }) => (
                    <Link
                        key={href}
                        href={href}
                        aria-current={
                            (href === '/' ? pathname === '/' : pathname.startsWith(href))
                                ? 'page'
                                : undefined
                        }
                    >
                        <span className="action-icon">
                            <Icon size={21} />
                            {count > 0 && <span className="action-count">{count}</span>}
                        </span>
                        <span>{label}</span>
                    </Link>
                ))}
            </nav>
        </>
    )
}
