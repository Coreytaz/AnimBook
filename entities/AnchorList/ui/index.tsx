import React, { FC, ReactNode } from 'react'
import cn from 'clsx'
import styles from './styles.module.scss'
import { Link } from '@nextui-org/react'

interface AnchorLinkProps {
    href: string
    title: string
}

export const Anchor: FC<{ children: ReactNode; className: string }> = ({ children, className }) => {
    return (
        <div className={cn(className, styles.root)}>
            <div>
                <span />
            </div>
            {children}
        </div>
    )
}

export const AnchorLink: FC<AnchorLinkProps> = ({ href, title }) => {
    const newhref = '#' + href
    return (
        <Link isExternal href={newhref}>
            {title}
        </Link>
    )
}
