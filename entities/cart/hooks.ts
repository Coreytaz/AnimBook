import { TypeRootState } from '@/app/GlobalRedux/store'
import { bindActionCreators, createSelector } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from './cartSlice'
import { getOrderProduct } from './orderSlice'

const allActionsCart = {
    ...cartActions,
}

const allActionsOrder = {
    getOrderProduct,
}

export const useActionCart = () => {
    const dispatch = useDispatch()
    return useMemo(() => bindActionCreators(allActionsCart, dispatch), [dispatch])
}

export const useActionOrder = () => {
    const dispatch = useDispatch()
    return useMemo(() => bindActionCreators(allActionsOrder, dispatch), [dispatch])
}

export const useProductStatus = (productId: string) => {
    const selectCartItems = (state: TypeRootState) => state.cartSlice
    const isProductInCart = useSelector(
        createSelector([selectCartItems], (state) => state.cartId.includes(productId))
    )
    return { isProductInCart }
}

export const useOrder = () => {
    const cartOrder = useSelector((state: TypeRootState) => state.cartSlice)
    const products = useSelector((state: TypeRootState) => state.orderSlice)
    const price = products.orderProduct.map((product) => product.price).reduce((a, b) => a + b, 0)

    return { products, price, cartOrder }
}
