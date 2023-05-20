import { TypeRootState } from '@/app/GlobalRedux/store'
import { bindActionCreators, createSelector } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { favActions, getFavProduct } from './favSlice'

const allActionsFav = {
    ...favActions,
    getFavProduct,
}

export const useActionFav = () => {
    const dispatch = useDispatch()
    return useMemo(() => bindActionCreators(allActionsFav, dispatch), [dispatch])
}

export const useProductFavStatus = (productId: string) => {
    const selectFavItems = (state: TypeRootState) => state.favSlice.favoritesId
    const isProductInFav = useSelector(
        createSelector([selectFavItems], (state) => state.includes(productId))
    )
    return { isProductInFav }
}

export const useTotalFav = () => {
    const favoritesId = useSelector((state: TypeRootState) => state.favSlice.favoritesId)
    return favoritesId.length
}

export const useFav = () => {
    const { favorites: products, favoritesId } = useSelector(
        (state: TypeRootState) => state.favSlice
    )

    return { products, favoritesId }
}
