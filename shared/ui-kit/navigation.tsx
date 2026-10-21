'use client'

import * as UI from '@heroui/react'
import { HTMLAttributes, ReactNode, createContext, useContext, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from './components'
import { withStyles } from './styles'

const NavbarContext = createContext({ open: false, toggle: () => {} })
const NavbarRoot = withStyles(
    ({
        disableScrollHandler,
        variant,
        isBordered,
        children,
        className,
        ...props
    }: HTMLAttributes<HTMLElement> & {
        disableScrollHandler?: boolean
        variant?: string
        isBordered?: boolean
    }) => {
        const [open, setOpen] = useState(false)
        return (
            <NavbarContext value={{ open, toggle: () => setOpen((value) => !value) }}>
                <header
                    {...props}
                    className={`sticky top-0 z-40 bg-background ${isBordered ? 'border-b border-border' : ''} ${className || ''}`}
                >
                    <nav
                        aria-label="Основная навигация"
                        className="relative mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6"
                    >
                        {children}
                    </nav>
                </header>
            </NavbarContext>
        )
    }
)
const NavbarContent = withStyles(
    ({
        activeColor,
        variant,
        className,
        ...props
    }: HTMLAttributes<HTMLDivElement> & { activeColor?: string; variant?: string }) => (
        <div {...props} className={`flex items-center gap-5 ${className || ''}`} />
    )
)
const NavbarToggle = () => {
    const { open, toggle } = useContext(NavbarContext)
    return (
        <UI.Button
            variant="ghost"
            isIconOnly
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onPress={toggle}
        >
            {open ? <X /> : <Menu />}
        </UI.Button>
    )
}
const NavbarCollapse = withStyles(({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
    const { open, toggle } = useContext(NavbarContext)
    return open ? (
        <div
            {...props}
            id="mobile-navigation"
            className={`absolute inset-x-0 top-20 flex flex-col gap-5 border-b border-border bg-background p-6 shadow-md ${className || ''}`}
            onClick={(event) => {
                if ((event.target as HTMLElement).closest('a')) toggle()
            }}
        />
    ) : null
})
export const Navbar = Object.assign(NavbarRoot, {
    Brand: withStyles((props: HTMLAttributes<HTMLDivElement>) => <div {...props} />),
    Content: NavbarContent,
    Link,
    Item: (props: HTMLAttributes<HTMLDivElement>) => <div {...props} />,
    Toggle: NavbarToggle,
    Collapse: NavbarCollapse,
    CollapseItem: Link,
})

type PaginationProps = Omit<HTMLAttributes<HTMLElement>, 'onChange'> & {
    total?: number
    page?: number
    initialPage?: number
    onChange?: (page: number) => void
    size?: 'sm' | 'md' | 'lg'
    animated?: boolean
    rounded?: boolean
}
export const Pagination = withStyles(
    ({
        total = 1,
        page,
        initialPage = 1,
        onChange,
        size,
        animated,
        rounded,
        ...props
    }: PaginationProps) => {
        const [internalPage, setInternalPage] = useState(initialPage)
        const current = Math.max(1, Math.min(page ?? internalPage, Math.max(total, 1)))
        const change = (value: number) => {
            setInternalPage(value)
            onChange?.(value)
        }
        const pages: (number | string)[] = []
        for (let number = 1; number <= Math.max(total, 1); number++) {
            if (number === 1 || number === total || Math.abs(number - current) <= 2)
                pages.push(number)
            else if (typeof pages.at(-1) !== 'string') pages.push(`ellipsis-${number}`)
        }
        return (
            <UI.Pagination {...props} size={size} aria-label="Страницы каталога">
                <UI.Pagination.Content>
                    <UI.Pagination.Item>
                        <UI.Pagination.Previous
                            aria-label="Предыдущая страница"
                            isDisabled={current <= 1}
                            onPress={() => change(current - 1)}
                        >
                            <UI.Pagination.PreviousIcon />
                        </UI.Pagination.Previous>
                    </UI.Pagination.Item>
                    {pages.map((number) => (
                        <UI.Pagination.Item key={number}>
                            {typeof number === 'number' ? (
                                <UI.Pagination.Link
                                    isActive={number === current}
                                    aria-label={`Страница ${number}`}
                                    onPress={() => change(number)}
                                >
                                    {number}
                                </UI.Pagination.Link>
                            ) : (
                                <UI.Pagination.Ellipsis />
                            )}
                        </UI.Pagination.Item>
                    ))}
                    <UI.Pagination.Item>
                        <UI.Pagination.Next
                            aria-label="Следующая страница"
                            isDisabled={current >= total}
                            onPress={() => change(current + 1)}
                        >
                            <UI.Pagination.NextIcon />
                        </UI.Pagination.Next>
                    </UI.Pagination.Item>
                </UI.Pagination.Content>
            </UI.Pagination>
        )
    }
)
