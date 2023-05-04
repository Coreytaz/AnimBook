import { useActionCart, useProductStatus } from '@/entities/cart'
import { Button, Modal, useModal, Text } from '@nextui-org/react'
import { ShoppingCart } from 'lucide-react'
import { useEffect } from 'react'

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

    useEffect(() => {
        return () => {
            window.document.body.style.overflow = ''
        }
    }, [])

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
                aria-labelledby="modal-title"
                open={visible}
                onClose={bindings.onClose}
            >
                <Modal.Header>
                    <Text h4>Вы точно хотите удалить товар из корзины?</Text>
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
