import { useSetQuaryParams } from '@/shared'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

export const PRICES = {
    MIN: 50,
    MAX: 1000,
}
export const usePrices = (namaParams: string) => {
    const router = useRouter()
    const pathname = usePathname()
    const { createQueryString, getParams } = useSetQuaryParams(namaParams)
    const [selected, setSelected] = useState<string>(getParams || '')
    const onChange = (value: string) => {
        if (value.length === 0) {
            router.push(`${pathname}?${createQueryString([])}`)
            setSelected(value)
            return
        }
        router.push(`${pathname}?${createQueryString([value])}`)
        setSelected(value)
    }

    return { selected, onChange }
}

export const useFilter = (
    namaParams: string
): {
    selected: string[]
    onChange: (value: string[]) => void
} => {
    const router = useRouter()
    const pathname = usePathname()
    const { createQueryString, getParams } = useSetQuaryParams(namaParams)
    const [selected, setSelected] = useState<string[]>(getParams?.split('_') || [])
    const onChange = (value: string[]) => {
        router.push(`${pathname}?${createQueryString(value)}`)
        setSelected(value)
    }

    return { selected, onChange }
}

export const VIEW_TYPE = {
    grid: 'grid' as const,
    list: 'list' as const,
}

type ViewTypeValue = (typeof VIEW_TYPE)[keyof typeof VIEW_TYPE]

export const defaultViewType = VIEW_TYPE.list

export const useViewType = (namaParams: string) => {
    const router = useRouter()
    const pathname = usePathname()
    const { createQueryString, getParams } = useSetQuaryParams(namaParams)
    const [viewType, setSelected] = useState<string>(getParams || defaultViewType)
    const setViewType = (value: string) => {
        if (value.length === 0) {
            router.push(`${pathname}?${createQueryString([])}`)
            setSelected(value)
            return
        }
        router.push(`${pathname}?${createQueryString([value])}`)
        setSelected(value)
    }

    const isGrid = viewType === 'grid'
    const isList = viewType === 'list'

    return { viewType: viewType as ViewTypeValue, setViewType, isGrid, isList }
}
