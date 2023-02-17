import { NextRouter } from 'next/router'

export const generateBreadcrumb = (router: NextRouter) => {
    const asPathWithoutQuery = router.asPath.split('?')[0]
    const asPathNestedRoutes = asPathWithoutQuery.split('/').filter((v) => v.length > 0)
    const crumblist = asPathNestedRoutes.map((subpath, idx) => {
        const href = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/')
        const title = subpath
        return { href, title }
    })

    return [{ href: '/', title: 'Home' }, ...crumblist]
}
