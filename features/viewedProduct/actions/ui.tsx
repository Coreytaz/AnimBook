import { useActionViewProduct, useViewProductStatus } from '@/entities/product'
import { Button, Tooltip } from '@nextui-org/react'
import { X } from 'lucide-react'
import { useEffect } from 'react'

type Props = {
    productId: string
    disabled?: boolean
}

export const useToggleViewedProduct = (productId: string) => {
    const isViewProduct = useViewProductStatus(productId)
    const { toggleProduct, delProduct } = useActionViewProduct()

    const handleToggle = () => {
        delProduct(productId)
    }

    return { isViewProduct, toggleProduct, handleToggle }
}

export const useAddViewedProductHistory = (productId: string) => {
    const { isViewProduct, toggleProduct } = useToggleViewedProduct(productId)

    useEffect(() => {
        if (!isViewProduct && productId) {
            toggleProduct(productId)
        }
    }, [isViewProduct, productId, toggleProduct])
}

export const DelViewedProductHistory = (props: Props) => {
    const { handleToggle } = useToggleViewedProduct(props.productId)
    const { disabled } = props
    return (
        <div style={{ position: 'absolute', top: -20, right: -30 }}>
            <Tooltip
                content={'Удалить из истории'}
                css={{ backgroundColor: '$gray100' }}
                placement="topEnd"
                hideArrow
            >
                <Button auto light onPress={handleToggle} icon={<X />} disabled={disabled} />
            </Tooltip>
        </div>
    )
}
