import { useActionCart, useProductCount, useProductStatus } from '@/entities/cart'
import { Button, Modal, useModal } from '@/shared/ui-kit'
import { Button as HeroButton } from '@heroui/react'
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'

type Props = {
    productId: string
    disabled?: boolean
}

const useToggleProduct = ({ productId, disabled }: Props) => {
    const { isProductInCart } = useProductStatus(productId)
    const { toggleProduct } = useActionCart()

    const handleToggle = () => {
        if (disabled) return
        toggleProduct(productId)
    }

    return { handleToggle, isProductInCart }
}

export const AddProduct = (props: Props) => {
    const { handleToggle, isProductInCart } = useToggleProduct(props)
    const { disabled } = props

    return (
        <Button auto onPress={handleToggle} disabled={disabled}>
            {isProductInCart ? 'Убрать из заказа' : 'Купить'}
        </Button>
    )
}

export const AddBookMini = (props: Props) => {
    const { handleToggle, isProductInCart } = useToggleProduct(props)
    const { disabled } = props

    return (
        <Button
            className="mini-cart-action"
            aria-label={isProductInCart ? 'Убрать из корзины' : 'Добавить в корзину'}
            aria-pressed={isProductInCart}
            auto
            icon={<ShoppingCart fill={isProductInCart ? 'currentColor' : 'none'} />}
            onPress={handleToggle}
            disabled={disabled}
        />
    )
}

export const DeleteProduct = (props: Props) => {
    const { handleToggle } = useToggleProduct(props)
    const { disabled } = props
    const { visible, setVisible, bindings } = useModal()

    return (
        <>
            <HeroButton
                variant="ghost"
                isIconOnly
                className="cart-remove"
                aria-label="Удалить книгу из корзины"
                onPress={() => {
                    setVisible(true)
                }}
                isDisabled={disabled}
            >
                <Trash2 size={18} />
            </HeroButton>
            <Modal
                closeButton
                aria-labelledby={`remove-cart-${props.productId}`}
                open={visible}
                onClose={bindings.onClose}
            >
                <Modal.Header>
                    <Modal.Heading id={`remove-cart-${props.productId}`}>
                        Удалить книгу из корзины?
                    </Modal.Heading>
                </Modal.Header>
                <Modal.Footer>
                    <Button
                        auto
                        onPress={() => {
                            bindings.onClose()
                        }}
                        disabled={disabled}
                    >
                        Отмена
                    </Button>
                    <Button
                        auto
                        color="error"
                        onPress={() => {
                            bindings.onClose()
                            handleToggle()
                        }}
                        disabled={disabled}
                    >
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export const Counter = ({ productId, disabled }: Props) => {
    const count = useProductCount(productId) ?? 1
    const { plusCountProduct, minusCountProduct } = useActionCart()

    return (
        <div className="cart-quantity" role="group" aria-label="Количество книг">
            <HeroButton
                variant="ghost"
                isIconOnly
                aria-label="Уменьшить количество"
                isDisabled={disabled || count <= 1}
                onPress={() => minusCountProduct(productId)}
            >
                <Minus size={16} />
            </HeroButton>
            <output className="cart-quantity-value" aria-live="polite" aria-label="Количество">
                {count}
            </output>
            <HeroButton
                variant="ghost"
                isIconOnly
                aria-label="Увеличить количество"
                isDisabled={disabled || count >= 10}
                onPress={() => plusCountProduct(productId)}
            >
                <Plus size={16} />
            </HeroButton>
        </div>
    )
}
