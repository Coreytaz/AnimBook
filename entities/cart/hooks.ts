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
        createSelector([selectCartItems], (state) =>
            Boolean(state.cartId.find((item) => item.productId === productId))
        )
    )
    return { isProductInCart }
}

export const useProductCount = (productId: string) => {
    const selectCartItems = (state: TypeRootState) => state.cartSlice
    const isProductInCart = useSelector(
        createSelector([selectCartItems], (state) =>
            state.cartId.find((item) => item.productId === productId)
        )
    )
    return isProductInCart?.count
}

export const useTotalCart = () => {
    const cartId = useSelector((state: TypeRootState) => state.cartSlice.cartId)
    return cartId.reduce((total, item) => total + item.count, 0)
}

export const selectOrder = createSelector(
    [(state: TypeRootState) => state.cartSlice, (state: TypeRootState) => state.orderSlice],
    (cartOrder, storedProducts) => {
        const counts = new Map(cartOrder.cartId.map((item) => [item.productId, item.count]))
        const orderProduct = storedProducts.orderProduct
            .filter((product) => counts.has(product._id))
            .map((product) => ({ ...product, count: counts.get(product._id)! }))

        return {
            products: { ...storedProducts, orderProduct },
            price: orderProduct.reduce(
                (total, product) => total + product.count * product.price,
                0
            ),
            cartOrder,
            productIdsKey: JSON.stringify([...counts.keys()].sort()),
        }
    }
)

export const useOrder = () => useSelector(selectOrder)
