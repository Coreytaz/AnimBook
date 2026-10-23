import { ArrowRight, BookOpen, House, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import styles from './styles.module.css'

type ErrorPageProps = {
    code: '404' | '500'
    onRetry?: () => void
}

export default function ErrorPage({ code, onRetry }: ErrorPageProps) {
    const notFound = code === '404'

    return (
        <section className={styles.page} aria-labelledby="error-title">
            <div className={styles.card}>
                <div className={styles.art} aria-hidden="true">
                    <span className={styles.code}>{code}</span>
                    <span className={styles.book}>
                        <BookOpen size={48} strokeWidth={1.4} />
                    </span>
                </div>
                <p className={styles.eyebrow}>AnimBook · Бывает и такое</p>
                <h1 id="error-title">
                    {notFound
                        ? 'Эта страница потерялась'
                        : 'История прервалась на самом интересном'}
                </h1>
                <p className={styles.description}>
                    {notFound
                        ? 'Возможно, ссылка устарела или в адресе опечатка. Но следующая любимая история наверняка найдётся в нашем каталоге.'
                        : 'Не удалось загрузить страницу. Попробуйте ещё раз чуть позже — мы будем рады продолжить с того же места.'}
                </p>
                <div className={styles.actions}>
                    {notFound ? (
                        <Link className={styles.primary} href="/catalog">
                            <BookOpen size={19} aria-hidden="true" /> В каталог
                            <ArrowRight size={18} aria-hidden="true" />
                        </Link>
                    ) : (
                        <button className={styles.primary} type="button" onClick={onRetry}>
                            <RotateCcw size={19} aria-hidden="true" /> Попробовать снова
                        </button>
                    )}
                    <Link className={styles.secondary} href="/">
                        <House size={19} aria-hidden="true" /> На главную
                    </Link>
                </div>
                <p className={styles.note}>
                    {notFound
                        ? 'Новая глава начинается с новой книги'
                        : 'Иногда даже хорошим историям нужна небольшая пауза'}
                </p>
            </div>
        </section>
    )
}
