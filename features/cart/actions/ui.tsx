import { useActionCart, useProductCount, useProductStatus } from '@/entities/cart'
import { Button, Modal, useModal } from '@/shared/ui-kit'
import { ShoppingCart } from 'lucide-react'

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
            css={{ w: '50%' }}
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
            <Button
                auto
                onPress={() => {
                    setVisible(true)
                }}
                disabled={disabled}
            >
                Удалить
            </Button>
            <Modal
                closeButton
                aria-labelledby={`remove-cart-${props.productId}`}
                open={visible}
                onClose={bindings.onClose}
            >
                <Modal.Header>
                    <Modal.Heading id={`remove-cart-${props.productId}`}>
                        Вы точно хотите удалить товар из корзины?
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
                        Нет
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
                        Да
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export const Counter = ({ productId }: Props) => {
    const count = useProductCount(productId)
    const { plusCountProduct, minusCountProduct } = useActionCart()

    return (
        <Button.Group>
            <Button disabled={count === 1} onPress={() => minusCountProduct(productId)}>
                -
            </Button>
            <Button disabled>{count}</Button>
            <Button disabled={count === 10} onPress={() => plusCountProduct(productId)}>
                +
            </Button>
        </Button.Group>
    )
}
