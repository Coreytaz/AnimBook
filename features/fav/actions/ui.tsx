import { useActionFav, useProductFavStatus } from '@/entities/fav'
import { Button } from '@/shared/ui-kit'
import { HeartIcon } from 'lucide-react'

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
        <Button
            onPress={handleToggle}
            auto
            icon={<HeartIcon fill={isProductInFav ? 'currentColor' : 'none'} />}
            disabled={disabled}
        />
    )
}

export const AddBookMini = (props: Props) => {
    const { handleToggle, isProductInFav } = useToggleProduct(props)
    const { disabled } = props
    return (
        <Button
            className="mini-fav-action"
            aria-label={isProductInFav ? 'Убрать из избранного' : 'Добавить в избранное'}
            aria-pressed={isProductInFav}
            onPress={handleToggle}
            icon={<HeartIcon fill={isProductInFav ? 'currentColor' : 'none'} />}
            disabled={disabled}
        ></Button>
    )
}
