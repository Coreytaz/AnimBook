import { Tooltip } from '@nextui-org/react'
import React, { useState, createContext, FC } from 'react'
import StarsList from './StarsList'

export const StarRatingContext = createContext<Partial<StarRatingProps>>({})

export interface StarRatingProps {
    rating?: number
    emptyColor?: string
    fillColor?: string
    height?: number
    hover?: null | number
    labelText?: (value: number) => string
    maxValue?: number
    onBlur?: () => void
    setRating?: (value: number) => void
    setHover?: (value: number | null) => void
    readOnly?: boolean
    width?: number
    tooltip?: boolean
}

const StarRating: FC<StarRatingProps> = ({
    onBlur,
    rating,
    emptyColor = 'grey',
    setRating,
    fillColor = '#edaa10',
    height = 20,
    labelText = (value: number) => `Рейтинг товара: ${value}`,
    tooltip = false,
    maxValue = 5,
    readOnly = false,
    width = 20,
}) => {
    const [hover, setHover] = useState<number | null>(null)

    const setOnBlur = () => {
        if (readOnly) return
        if (onBlur) {
            onBlur()
        }
    }

    const setRatingFn = (value: number) => {
        if (readOnly) return
        if (setRating) {
            setRating(value)
        }
    }

    const setHoverFn = (value: number | null) => {
        if (readOnly) return
        setHover(value)
    }

    return (
        <>
            <StarRatingContext.Provider
                value={{
                    onBlur: setOnBlur,
                    emptyColor,
                    fillColor,
                    height,
                    hover,
                    labelText,
                    rating,
                    setHover: setHoverFn,
                    setRating: setRatingFn,
                    width,
                    maxValue,
                }}
            >
                <>
                    {tooltip ? (
                        <Tooltip content={labelText(rating!)}>
                            <StarsList />
                        </Tooltip>
                    ) : (
                        <StarsList />
                    )}
                </>
            </StarRatingContext.Provider>
        </>
    )
}

export default StarRating
