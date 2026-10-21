'use client'

import * as UI from '@heroui/react'
import NextLink from 'next/link'
import {
    AnchorHTMLAttributes,
    HTMLAttributes,
    ImgHTMLAttributes,
    ReactNode,
    forwardRef,
} from 'react'
import { withStyles, StyledProps } from './styles'

export type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'error'
export function heroColor(color?: Color): UI.ChipProps['color'] {
    return color === 'primary' || color === 'secondary'
        ? 'accent'
        : color === 'error'
          ? 'danger'
          : color
}

export type CardProps = HTMLAttributes<HTMLDivElement> &
    StyledProps & { variant?: 'flat' | 'bordered'; isPressable?: boolean; isHoverable?: boolean }
const CardRoot = withStyles(
    forwardRef<HTMLDivElement, CardProps>(function Card(
        { variant, isPressable, isHoverable, className, onKeyDown, children, ...props },
        ref
    ) {
        return (
            <UI.Card
                {...props}
                ref={ref}
                className={`w-full gap-0 p-0 ${variant === 'bordered' ? 'border border-border' : ''} ${isHoverable ? 'transition-shadow hover:shadow-lg' : ''} ${isPressable ? 'cursor-pointer' : ''} ${className || ''}`}
                role={isPressable ? 'button' : props.role}
                tabIndex={isPressable ? 0 : props.tabIndex}
                onKeyDown={(event) => {
                    onKeyDown?.(event)
                    if (
                        isPressable &&
                        event.target === event.currentTarget &&
                        !event.defaultPrevented &&
                        ['Enter', ' '].includes(event.key)
                    ) {
                        event.preventDefault()
                        event.currentTarget.click()
                    }
                }}
            >
                {children}
            </UI.Card>
        )
    })
)
const Image = withStyles(
    ({
        objectFit,
        showSkeleton,
        style,
        alt = '',
        ...props
    }: ImgHTMLAttributes<HTMLImageElement> & {
        objectFit?: 'cover' | 'contain'
        showSkeleton?: boolean
    }) => (
        // HeroUI v3 uses native images; product images have variable external sources and dimensions.
        // eslint-disable-next-line @next/next/no-img-element
        <img {...props} alt={alt} style={{ objectFit, ...style }} />
    )
)
export { Image }
export const Card = Object.assign(CardRoot, {
    Header: withStyles(({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
        <UI.Card.Header {...props} className={`flex items-center px-4 py-3 ${className || ''}`} />
    )),
    Body: withStyles(({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
        <UI.Card.Content {...props} className={`flex flex-col px-4 py-3 ${className || ''}`} />
    )),
    Footer: withStyles(({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
        <UI.Card.Footer {...props} className={`flex items-center px-4 py-3 ${className || ''}`} />
    )),
    Divider: UI.Separator,
    Image,
})

export type ButtonProps = Omit<UI.ButtonProps, 'children'> & {
    children?: ReactNode
    color?: Color
    auto?: boolean
    light?: boolean
    ghost?: boolean
    bordered?: boolean
    shadow?: boolean
    icon?: ReactNode
    disabled?: boolean
    target?: string
}
export const ButtonRoot = withStyles(
    ({
        auto,
        light,
        ghost,
        bordered,
        shadow,
        icon,
        disabled,
        color,
        target,
        children,
        className,
        variant,
        ...props
    }: ButtonProps) => (
        <UI.Button
            {...props}
            type={props.type || 'button'}
            isDisabled={disabled ?? props.isDisabled}
            variant={
                color === 'error' || color === 'danger'
                    ? light || ghost
                        ? 'danger-soft'
                        : 'danger'
                    : light || ghost
                      ? 'ghost'
                      : bordered
                        ? 'outline'
                        : variant
            }
            className={`${auto ? 'min-w-0' : ''} ${shadow ? 'shadow-md' : ''} ${className || ''}`}
        >
            {icon}
            {children}
        </UI.Button>
    )
)
export const Button = Object.assign(ButtonRoot, {
    Group: withStyles(({ ghost, ...props }: UI.ButtonGroupProps & { ghost?: boolean }) => (
        <UI.ButtonGroup {...props} variant={ghost ? 'ghost' : props.variant} />
    )),
})

export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, 'color' | 'content'> &
    StyledProps & {
        color?: Color
        variant?: 'bordered' | 'flat' | 'dot'
        isSquared?: boolean
        size?: 'sm' | 'md' | 'lg'
        content?: ReactNode
        isInvisible?: boolean
    }
export const Badge = withStyles(
    ({
        isSquared,
        color,
        content,
        isInvisible,
        variant,
        children,
        className,
        ...props
    }: BadgeProps) =>
        content !== undefined ? (
            <UI.Badge.Anchor {...props} className={className}>
                {children}
                {!isInvisible && (
                    <UI.Badge color={heroColor(color)}>
                        <UI.Badge.Label>{content}</UI.Badge.Label>
                    </UI.Badge>
                )}
            </UI.Badge.Anchor>
        ) : variant === 'dot' ? (
            <span
                {...props}
                className={`inline-block size-2 rounded-full ${className || ''}`}
                style={{
                    background:
                        color === 'success'
                            ? 'var(--success)'
                            : color === 'warning'
                              ? 'var(--warning)'
                              : 'var(--accent)',
                    ...props.style,
                }}
            />
        ) : (
            <UI.Chip
                {...props}
                color={heroColor(color)}
                variant={variant === 'bordered' ? 'secondary' : 'soft'}
                className={`${isSquared ? 'rounded-md' : ''} ${className || ''}`}
            >
                <UI.Chip.Label>{children}</UI.Chip.Label>
            </UI.Chip>
        )
)

type AvatarProps = Omit<HTMLAttributes<HTMLSpanElement>, 'color'> & {
    text?: string
    name?: string
    textColor?: string
    bordered?: boolean
    color?: Color
    size?: 'sm' | 'md' | 'lg'
    as?: 'button'
    icon?: ReactNode
    src?: string
}
export const Avatar = withStyles(
    forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
        { text, name, textColor, bordered, color, size, as, icon, src, className, ...props },
        ref
    ) {
        const label = text || name || 'Профиль'
        const contents = (
            <>
                {src && <UI.Avatar.Image src={src} alt={label} />}
                <UI.Avatar.Fallback>{icon || label.slice(0, 2)}</UI.Avatar.Fallback>
            </>
        )
        return (
            <UI.Avatar
                {...props}
                ref={ref}
                asChild={as === 'button'}
                color={heroColor(color)}
                size={size}
                aria-label={props['aria-label'] || label}
                className={`${bordered ? 'ring-2 ring-border ring-offset-2 ring-offset-background' : ''} ${className || ''}`}
            >
                {as === 'button' ? <button type="button">{contents}</button> : contents}
            </UI.Avatar>
        )
    })
)

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> & {
    as?: unknown
    isExternal?: boolean
    isActive?: boolean
    color?: Color | 'foreground'
}
export const Link = withStyles(
    ({ as, isExternal, isActive, color, href = '#', className, ...props }: LinkProps) => (
        <NextLink
            {...props}
            href={href}
            target={isExternal ? '_blank' : props.target}
            rel={isExternal ? 'noopener noreferrer' : props.rel}
            className={`link ${className || ''}`}
            aria-current={isActive ? 'page' : undefined}
            style={{
                color:
                    isActive || color === 'primary'
                        ? 'var(--accent)'
                        : color === 'danger'
                          ? 'var(--danger)'
                          : 'inherit',
                ...props.style,
            }}
        />
    )
)
export const Loading = withStyles(
    ({
        color,
        ...props
    }: Omit<UI.SpinnerProps, 'color'> & {
        color?: Color | 'currentColor' | 'current' | 'white'
    }) => {
        const mapped =
            color === 'currentColor' || color === 'white' || color === 'current'
                ? 'current'
                : heroColor(color)
        return <UI.Spinner {...props} color={mapped === 'default' ? 'accent' : mapped} />
    }
)

export const Table = Object.assign(
    withStyles(
        ({
            headerLined,
            shadow,
            children,
            ...props
        }: UI.TableContentProps & { headerLined?: boolean; shadow?: boolean }) => (
            <UI.Table>
                <UI.Table.ScrollContainer>
                    <UI.Table.Content {...props}>{children}</UI.Table.Content>
                </UI.Table.ScrollContainer>
            </UI.Table>
        )
    ),
    {
        Header: UI.Table.Header,
        Column: UI.Table.Column,
        Body: UI.Table.Body,
        Row: UI.Table.Row,
        Cell: UI.Table.Cell,
    }
)
