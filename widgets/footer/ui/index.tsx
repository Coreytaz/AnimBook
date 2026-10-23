'use client'
import { Button } from '@heroui/react'
import { BookOpen, Moon, Sun, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import useTheme from '@/shared/hooks/useTheme'
export default function Footer() {
    const { isDark } = useTheme()
    const toggle = () => {
        const theme = isDark ? 'light' : 'dark'
        localStorage.setItem('data-theme', theme)
        document.documentElement.dataset.theme = theme
        document.documentElement.classList.toggle('dark', theme === 'dark')
    }
    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <div>
                    <Link href="/" className="footer-brand">
                        <BookOpen size={22} /> AnimBook
                    </Link>
                    <p>Маленькая пауза. Большая история.</p>
                </div>
                <div className="footer-links">
                    <Link href="/catalog">
                        Каталог <ArrowUpRight size={14} />
                    </Link>
                    <Link href="/fav">Избранное</Link>
                    <Link href="/cart">Корзина</Link>
                </div>
                <div className="footer-meta">
                    <span>© {new Date().getFullYear()} AnimBook</span>
                    <Button
                        variant="secondary"
                        isIconOnly
                        aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
                        onPress={toggle}
                    >
                        {isDark ? <Sun size={19} /> : <Moon size={19} />}
                    </Button>
                </div>
            </div>
        </footer>
    )
}
