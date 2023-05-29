import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const useQueryParams = () => {
    const searchParams = useSearchParams()

    const getAllParams = () => {
        const params: { [key: string]: any } = {}

        searchParams?.forEach((value, key) => {
            params[key] = value
        })

        return params
    }

    useEffect(() => {
        getAllParams()
    }, []) // Run only once on component mount

    return getAllParams()
}
