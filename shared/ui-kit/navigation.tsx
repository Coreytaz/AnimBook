'use client'
import * as UI from '@heroui/react'
import { HTMLAttributes, useState } from 'react'
import { withStyles } from './styles'

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
