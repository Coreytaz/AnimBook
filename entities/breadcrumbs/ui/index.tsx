import { Breadcrumbs } from '@heroui/react'
import { usePathname } from 'next/navigation'
const names: Record<string, string> = {
    catalog: 'Каталог',
    product: 'Книга',
    cart: 'Корзина',
    fav: 'Избранное',
    profile: 'Профиль',
    checkout: 'Оформление',
}
export default function NavBreadcrumbs({ currentLabel }: { currentLabel?: string }) {
    const parts = (usePathname() || '').split('/').filter(Boolean)
    return (
        <Breadcrumbs className="page-breadcrumbs">
            <Breadcrumbs.Item href="/">Главная</Breadcrumbs.Item>
            {parts.map((part, i) => (
                <Breadcrumbs.Item
                    key={part}
                    href={
                        i < parts.length - 1
                            ? part === 'product'
                                ? '/catalog'
                                : '/' + parts.slice(0, i + 1).join('/')
                            : undefined
                    }
                >
                    {i === parts.length - 1 && currentLabel
                        ? currentLabel
                        : names[part] || decodeURIComponent(part).replaceAll('-', ' ')}
                </Breadcrumbs.Item>
            ))}
        </Breadcrumbs>
    )
}
