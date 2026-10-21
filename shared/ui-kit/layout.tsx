'use client'

import { CSSProperties, HTMLAttributes, forwardRef } from 'react'
import { Styles, StyledProps, withStyles } from './styles'

type LayoutProps = HTMLAttributes<HTMLDivElement> &
    StyledProps & {
        justify?: CSSProperties['justifyContent']
        align?: CSSProperties['alignItems']
        alignItems?: CSSProperties['alignItems']
        alignContent?: CSSProperties['alignContent']
        direction?: CSSProperties['flexDirection']
        wrap?: CSSProperties['flexWrap']
        gap?: number
        display?: CSSProperties['display']
        xs?: number | boolean
        sm?: number | boolean
        md?: number | boolean
        lg?: number | boolean
        span?: number
    }
const Box = withStyles(
    forwardRef<HTMLDivElement, LayoutProps>(function Box(
        {
            justify,
            align,
            alignItems,
            alignContent,
            direction,
            wrap,
            gap,
            display,
            xs,
            sm,
            md,
            lg,
            span,
            style,
            ...props
        },
        ref
    ) {
        return (
            <div
                ref={ref}
                {...props}
                style={{
                    justifyContent: justify,
                    alignItems: align || alignItems,
                    alignContent,
                    flexDirection: direction,
                    flexWrap: wrap,
                    gap: gap ? `${gap * 8}px` : undefined,
                    display,
                    ...style,
                }}
            />
        )
    })
)
export const Container = forwardRef<HTMLDivElement, LayoutProps>(function Container(
    { css, ...props },
    ref
) {
    return (
        <Box
            ref={ref}
            {...props}
            css={{
                width: '100%',
                maxWidth: props.lg ? '1280px' : '1400px',
                margin: '0 auto',
                padding: '0 12px',
                ...css,
            }}
        />
    )
})
export const Row = forwardRef<HTMLDivElement, LayoutProps>(function Row({ css, ...props }, ref) {
    return <Box ref={ref} {...props} css={{ display: 'flex', width: '100%', ...css }} />
})
export const Col = forwardRef<HTMLDivElement, LayoutProps>(function Col(
    { css, span, ...props },
    ref
) {
    return (
        <Box
            ref={ref}
            {...props}
            css={{ width: span ? `${(span / 12) * 100}%` : '100%', ...css }}
        />
    )
})
const GridItem = forwardRef<HTMLDivElement, LayoutProps>(function Grid(
    { css, xs, sm, md, lg, ...props },
    ref
) {
    const sizes: Styles = {}
    for (const [breakpoint, size] of Object.entries({ xs, sm, md, lg })) {
        if (size === undefined) continue
        const rules =
            size === true
                ? { flex: '1 1 0', minWidth: 0 }
                : {
                      flex: `0 0 ${(Number(size) / 12) * 100}%`,
                      maxWidth: `${(Number(size) / 12) * 100}%`,
                  }
        if (breakpoint === 'xs') Object.assign(sizes, rules)
        else sizes[`@${breakpoint}`] = rules
    }
    return <Box ref={ref} {...props} css={{ display: 'flex', padding: '8px', ...sizes, ...css }} />
})
export const Grid = Object.assign(GridItem, {
    Container: forwardRef<HTMLDivElement, LayoutProps>(function GridContainer(
        { css, ...props },
        ref
    ) {
        return (
            <Box
                ref={ref}
                {...props}
                css={{ display: 'flex', flexWrap: 'wrap', width: '100%', ...css }}
            />
        )
    }),
})
export const Spacer = ({
    x = 0,
    y = 1,
    css,
    ...props
}: LayoutProps & { x?: number; y?: number }) => (
    <Box {...props} css={{ width: `${x * 16}px`, height: `${y * 16}px`, flexShrink: 0, ...css }} />
)

type TextProps = HTMLAttributes<HTMLElement> &
    StyledProps & {
        h1?: boolean
        h2?: boolean
        h3?: boolean
        h4?: boolean
        b?: boolean
        span?: boolean
        size?: number | string
        weight?: CSSProperties['fontWeight']
        color?: string
        transform?: CSSProperties['textTransform']
    }
export const Text = withStyles(
    ({ h1, h2, h3, h4, b, span, size, weight, color, transform, style, ...props }: TextProps) => {
        const Tag = h1 ? 'h1' : h2 ? 'h2' : h3 ? 'h3' : h4 ? 'h4' : span || b ? 'span' : 'p'
        const fontSize =
            typeof size === 'string' && size.startsWith('$')
                ? {
                      $xs: '.75rem',
                      $sm: '.875rem',
                      $lg: '1.125rem',
                      $xl: '1.25rem',
                      $2xl: '1.5rem',
                      $3xl: '1.875rem',
                  }[size] || '1rem'
                : size
        return (
            <Tag
                {...props}
                style={{
                    fontSize,
                    fontWeight: weight || (b ? 'bold' : undefined),
                    color:
                        color && ['primary', 'error', 'danger'].includes(color)
                            ? `var(--animbook-colors-${color})`
                            : color,
                    textTransform: transform,
                    ...style,
                }}
            />
        )
    }
)
