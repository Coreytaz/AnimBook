import { useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

const useSetQuaryParams = (name: string) => {
    const searchParams = useSearchParams()
    const getParams = searchParams.get(name)

    const createQueryString = useCallback(
        (value: string[]) => {
            const params = new URLSearchParams(searchParams)
            if (value.length === 0) {
                params.delete(name)
                return params.toString()
            }
            const valuearr = value.join('_')
            params.set(name, valuearr)

            return params.toString()
        },
        [name, searchParams]
    )

    return { createQueryString, getParams }
}

export default useSetQuaryParams
