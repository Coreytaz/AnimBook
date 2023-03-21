import { TypeRootState } from '@/app/GlobalRedux/store'
import { bindActionCreators, createSelector } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { favActions } from './favSlice'

const allActionsFav = {
    ...favActions,
}

export const useActionFav = () => {
    const dispatch = useDispatch()
    return useMemo(() => bindActionCreators(allActionsFav, dispatch), [dispatch])
}

export const useProductFavStatus = (productId: string) => {
    const selectFavItems = (state: TypeRootState) => state.favSlice
    const isProductInFav = useSelector(
        createSelector([selectFavItems], (state) => state.includes(productId))
    )
    return { isProductInFav }
}
