import { useSetQuaryParams } from '@/shared'
import { usePathname, useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

export const PRICES = {
    MIN: 50,
    MAX: 1000,
}
export const usePrices = (namaParams: string) => {
    const router = useRouter()
    const pathname = usePathname()
    const { createQueryString, getParams } = useSetQuaryParams(namaParams)
    const [selected, setSelected] = useState<string>(getParams || '')
    const onChangePublisher = (value: string) => {
        if (value.length === 0) {
            router.push(`${pathname}?${createQueryString([])}`)
            setSelected(value)
            return
        }
        router.push(`${pathname}?${createQueryString([value])}`)
        setSelected(value)
    }

    return { selected, onChangePublisher }
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
