'use client'

export type ProductTab = 'characteristics' | 'opinion'

// Keep tab state in the URL without starting a Next.js server navigation.
export function setProductTab(tab: ProductTab | null) {
    const url = new URL(window.location.href)
    if (tab) url.searchParams.set('tabs', tab)
    else url.searchParams.delete('tabs')

    const next = url.pathname + url.search + url.hash
    if (next !== window.location.pathname + window.location.search + window.location.hash) {
        window.history.pushState(null, '', next)
    }
}
