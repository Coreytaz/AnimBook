import { useSearchParams } from 'next/navigation'


export const useQueryParams = () => {
    const searchParams = useSearchParams()

    const getAllParams = () => {
        const params: { [key: string]: any } = {}

        searchParams?.forEach((value, key) => {
            params[key] = value
        })

        return params
    }


    return getAllParams()
}
