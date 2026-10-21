'use client'
import { HTMLAttributes, ReactNode } from 'react'

type CollapseProps = Omit<HTMLAttributes<HTMLDetailsElement>, 'onChange' | 'title'> & {
    title?: ReactNode
    expanded?: boolean
    onChange?: (event: React.SyntheticEvent, index: number, open: boolean) => void
    index?: number
}
const CollapseRoot = ({
    title,
    expanded,
    children,
    onChange,
    index = 1,
    ...props
}: CollapseProps) => (
    <details
        {...props}
        open={expanded}
        className="ui-collapse"
        onToggle={(event) => {
            if (event.currentTarget.open !== !!expanded)
                onChange?.(event, index, event.currentTarget.open)
        }}
    >
        <summary>{title}</summary>
        {children}
    </details>
)
export const Collapse = Object.assign(CollapseRoot, {
    Group: ({
        children,
        animated,
        splitted,
    }: {
        children?: ReactNode
        animated?: boolean
        splitted?: boolean
    }) => <div className="w-full">{children}</div>,
})
