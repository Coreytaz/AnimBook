import React, { useContext } from 'react'
import { StarRatingContext } from '.'
import Star from './Star'
import styles from './styles.module.scss'

function StarsList() {
    const { maxValue } = useContext(StarRatingContext)

    return (
        <div className={styles.star_rating}>
            {[...Array(maxValue)].map((_, index) => {
                const value = index + 1

                return <Star key={index} value={value} />
            })}
        </div>
    )
}

export default StarsList
