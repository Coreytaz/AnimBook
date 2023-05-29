import React, { FC, useContext } from 'react'
import { StarRatingContext } from '.'
import styles from './styles.module.scss'

const Star: FC<{ value: number }> = ({ value }) => {
    const { emptyColor, fillColor, height, hover, rating, setHover, setRating, width, onBlur } =
        useContext(StarRatingContext)

    const onMouseEnter = () => {
        if (!setHover) {
            return
        }
        setHover(value)
    }
    const onMouseLeave = () => {
        if (!setHover) {
            return
        }
        setHover(null)
    }
    const onClick = () => {
        if (!setRating) {
            return
        }
        setRating(value)
    }

    return (
        <div
            className={styles.star}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <svg
                data-rating={value}
                fill={value <= (hover! || rating!) ? fillColor : emptyColor}
                height={height}
                viewBox="0 0 20 20"
                width={width}
            >
                <polygon
                    strokeWidth="0"
                    points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
                />
            </svg>
        </div>
    )
}

export default Star
