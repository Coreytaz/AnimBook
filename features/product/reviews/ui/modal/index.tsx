import { Modal, Input, Row, Checkbox, Button, Text } from '@nextui-org/react'
import { Dispatch, FC, SetStateAction } from 'react'

const ReviewModal: FC<{ visible: boolean; setVisible: Dispatch<SetStateAction<boolean>> }> = ({
    visible,
    setVisible,
}) => {
    const closeHandler = () => {
        setVisible(false)
    }
    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            preventClose
            blur
            open={visible}
            onClose={closeHandler}
        >
            <Modal.Header autoMargin>
                <Text id="modal-title" size={18}>
                    Мой отзыв о Случайная фигурка Genshin Impact
                </Text>
            </Modal.Header>
            <Modal.Body>
                <Input clearable bordered fullWidth color="primary" size="lg" placeholder="Email" />
                <Input
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Password"
                />
                <Row justify="space-between">
                    <Checkbox>
                        <Text size={14}>Remember me</Text>
                    </Checkbox>
                    <Text size={14}>Forgot password?</Text>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button auto flat color="error" onPress={closeHandler}>
                    Close
                </Button>
                <Button auto onPress={closeHandler}>
                    Sign in
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ReviewModal
