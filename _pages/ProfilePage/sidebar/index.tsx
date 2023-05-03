import { Anchor, AnchorLink } from '@/entities/AnchorList'
import { topics } from '@/widgets/header'
import styles from './styles.module.scss'

export const Sidebar = () => {
    return (
        <section className={styles.root}>
            <Anchor className={styles.topic}>
                {topics.map((topic) => (
                    <AnchorLink key={topic.id} href={topic.id} title={topic.title} />
                ))}
            </Anchor>
        </section>
    )
}

export default Sidebar
