import cn from 'clsx'
import styles from './styles.module.scss'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn(styles.root, className)} {...props} />
}

export { Skeleton }
