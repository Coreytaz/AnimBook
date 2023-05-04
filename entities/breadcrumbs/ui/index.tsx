import { IBreadcrumbsLocationState } from '@/shared/api'
import { Container, Text } from '@nextui-org/react'
import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useMemo } from 'react'
import styles from './styles.module.scss'

interface CrumbsProps {
    id: string
    title: string
    href: string
    last: boolean
}

const NavBreadcrumbs: FC = () => {
    const pathname = usePathname()
    const breadcrumbs = useMemo(
        function generateBreadcrumbs() {
            const asPathWithoutQuery = pathname?.split('?')[0]
            const asPathNestedRoutes = asPathWithoutQuery?.split('/').filter((v) => v.length > 0)
            if (asPathNestedRoutes) {
                const crumblist = asPathNestedRoutes.map((subpath, idx) => {
                    const href = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/')
                    return { href, title: subpath }
                })

                return [{ href: '/', title: 'Home' }, ...crumblist]
            }
        },
        [pathname]
    )
    return (
        <Container lg>
            <nav className={styles.breadcrumbs}>
                {breadcrumbs?.map((crumb, idx) => (
                    <Crumb
                        id={crumb.href}
                        {...crumb}
                        key={idx}
                        last={idx === breadcrumbs.length - 1}
                    />
                ))}
            </nav>
        </Container>
    )
}

const Crumb: FC<CrumbsProps> = ({ title, href, last }) => {
    if (last) {
        return <Text>{title}</Text>
    }
    return (
        <>
            <Link href={href} className={styles.link}>
                <Text
                    color="primary"
                    css={{
                        transition: '$button',
                        '&:hover': {
                            color: '$blue500',
                        },
                    }}
                >
                    {title === 'Home' ? <Home /> : title}
                </Text>
            </Link>
            <ChevronRight />
        </>
    )
}

export default NavBreadcrumbs
