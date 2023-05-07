import { useRef, useEffect, MutableRefObject } from 'react'

export const useScrollVertical = (): MutableRefObject<HTMLDivElement> => {
    const scrollVerticalRef = useRef<HTMLDivElement>(null!)

    const onWheel = (e: WheelEvent) => {
        e.preventDefault()
        e.stopPropagation()
        scrollVerticalRef.current.scrollTo({
            left: +scrollVerticalRef.current.scrollLeft + e.deltaY * 4,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        if (scrollVerticalRef.current) {
            scrollVerticalRef.current.addEventListener('wheel', onWheel)
            return () => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                scrollVerticalRef.current?.removeEventListener('wheel', onWheel)
            }
        }
    }, [])

    return scrollVerticalRef
}
