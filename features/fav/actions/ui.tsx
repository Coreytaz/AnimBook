import { useActionFav, useProductFavStatus } from '@/entities/fav'
import { Tooltip, Button } from '@nextui-org/react'
import { HeartIcon } from '../svg/HeardIcon'

type Props = {
    productId: string
    disabled?: boolean
}

const useToggleProduct = ({ productId, disabled }: Props) => {
    const { isProductInFav } = useProductFavStatus(productId)
    const { toggleProduct } = useActionFav()

    const handleToggle = () => {
        if (disabled) return
        toggleProduct(productId)
    }

    return { handleToggle, isProductInFav }
}

export const AddProduct = (props: Props) => {
    const { handleToggle, isProductInFav } = useToggleProduct(props)
    const { disabled } = props
    return (
        <Tooltip content={isProductInFav ? 'Убрать из избранного' : 'Добавить в избранное'}>
            <Button
                onPress={handleToggle}
                auto
                icon={<HeartIcon fill="currentColor" filled={isProductInFav} />}
                disabled={disabled}
            />
        </Tooltip>
    )
}

export const AddBookMini = (props: Props) => {
    const { handleToggle, isProductInFav } = useToggleProduct(props)
    const { disabled } = props
    return (
        <Button
            css={{ w: '40%' }}
            onPress={handleToggle}
            icon={<HeartIcon fill="currentColor" filled={isProductInFav} />}
            disabled={disabled}
        ></Button>
    )
}
