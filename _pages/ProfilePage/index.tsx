'use client'
import Aside from './aside'
import Content from './content'
import styles from './styles.module.css'

export default function ProfilePage() {
    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <span className={styles.eyebrow}>Ваш личный кабинет</span>
                <h1>Профиль</h1>
                <p>Личные данные и ваши книжные истории — всё в одном месте.</p>
            </header>
            <div className={styles.layout}>
                <Aside />
                <Content />
            </div>
        </main>
    )
}
