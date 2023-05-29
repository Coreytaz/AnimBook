import { TypeRootState } from '@/app/GlobalRedux/store'
import { bindActionCreators, createSelector } from '@reduxjs/toolkit'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getViewProductApi } from '../api/getViewProductApi'
import { viewProductActions } from './viewProduct'

const allActionsViewProduct = {
    ...viewProductActions,
}

export const useActionViewProduct = () => {
    const dispatch = useDispatch()
    return useMemo(() => bindActionCreators(allActionsViewProduct, dispatch), [dispatch])
}

export const useViewProductStatus = (productId: string) => {
    const selectViewProductItems = (state: TypeRootState) => state.viewProductSlice
    const isViewProduct = useSelector(
        createSelector([selectViewProductItems], (state) => state.viewProductId.includes(productId))
    )
    return isViewProduct
}

export const useGetViewProductsQuery = () => {
    const selectViewProductItems = useSelector(
        (state: TypeRootState) => state.viewProductSlice.viewProductId
    )
    const getView = getViewProductApi.useGetViewProductsQuery(selectViewProductItems.join('_'))

    return getView
}
