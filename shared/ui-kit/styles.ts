import emotionStyled from '@emotion/styled'
import { CSSObject } from '@emotion/react'
import { ComponentType, JSX } from 'react'

export type Styles = { [key: string]: string | number | undefined | Styles }
export type StyledProps = { css?: Styles; hideIn?: string; showIn?: string }
const breakpoints: Record<string, number> = { xs: 650, sm: 960, md: 1280, lg: 1400, xl: 1920 }
const aliases: Record<string, string> = {
    d: 'display',
    fd: 'flexDirection',
    jc: 'justifyContent',
    ai: 'alignItems',
    w: 'width',
    h: 'height',
    mw: 'maxWidth',
    maxW: 'maxWidth',
    minW: 'minWidth',
    minH: 'minHeight',
    p: 'padding',
    px: 'paddingInline',
    py: 'paddingBlock',
    pt: 'paddingTop',
    pb: 'paddingBottom',
    pl: 'paddingLeft',
    pr: 'paddingRight',
    m: 'margin',
    mx: 'marginInline',
    my: 'marginBlock',
    mt: 'marginTop',
    mb: 'marginBottom',
    ml: 'marginLeft',
    mr: 'marginRight',
    br: 'borderRadius',
}
const fontSizes: Record<string, string> = {
    xs: '.75rem',
    sm: '.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
}
function token(name: string, property: string): string {
    if (/^\d+$/.test(name)) return property === 'zIndex' ? name : `${Number(name) * 4}px`
    if (name === 'full') return '100%'
    if (name === 'rounded') return '9999px'
    if (name === 'button') return 'all 150ms ease'
    if (name.startsWith('breakpoints-')) return `${breakpoints[name.slice(12)]}px`
    if (property === 'fontSize') return fontSizes[name] || '1rem'
    if (property === 'borderRadius') return fontSizes[name] || '12px'
    return `var(--animbook-colors-${name})`
}
export function resolveStyles(styles: Styles = {}): CSSObject {
    const result: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(styles)) {
        if (value === undefined) continue
        if (key.startsWith('@') && breakpoints[key.slice(1)]) {
            result[`@media (min-width: ${breakpoints[key.slice(1)]}px)`] = resolveStyles(
                value as Styles
            )
        } else if (typeof value === 'object') {
            result[key] = resolveStyles(value)
        } else if (key === 'dflex') {
            Object.assign(result, { display: 'flex', justifyContent: value, alignItems: value })
        } else if (key === 'size') {
            result.width = result.height =
                typeof value === 'string'
                    ? value.replace(/\$([\w-]+)/g, (_, t) => token(t, 'width'))
                    : value
        } else if (key === 'textGradient') {
            Object.assign(result, {
                backgroundImage: `linear-gradient(${String(value).replace(/\$([\w-]+)/g, (_, t) => token(t, 'color'))})`,
                backgroundClip: 'text',
                color: 'transparent',
            })
        } else {
            const property = aliases[key] || key
            result[property] =
                typeof value === 'string'
                    ? value.replace(/\$([\w-]+)/g, (_, t) => token(t, property))
                    : value
        }
    }
    return result as CSSObject
}

// Keep the application's spacing tokens and responsive rules independent of the component library's styling engine.
export function withStyles<P extends object>(component: ComponentType<P>) {
    return emotionStyled(component, {
        shouldForwardProp: (p) => !['css', 'hideIn', 'showIn'].includes(p),
    })<StyledProps>((p) => ({
        ...resolveStyles(p.css),
        ...(p.hideIn
            ? { [`@media (max-width: ${breakpoints[p.hideIn]}px)`]: { display: 'none' } }
            : {}),
        ...(p.showIn
            ? { [`@media (min-width: ${breakpoints[p.showIn] + 1}px)`]: { display: 'none' } }
            : {}),
    }))
}
export function styled(tag: keyof JSX.IntrinsicElements, styles: Styles) {
    return emotionStyled(tag)(resolveStyles(styles))
}
