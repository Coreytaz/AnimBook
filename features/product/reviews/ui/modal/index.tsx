import { StarRating } from '@/entities/StarRating'
import { Modal, Input, Row, Checkbox, Button, Text, Textarea, Badge } from '@nextui-org/react'
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
            <Modal.Header css={{ display: 'block' }}>
                <Text id="modal-title" size={18}>
                    Мой отзыв
                </Text>
                <Text id="modal-title" size={16} b>
                    Случайная фигурка Genshin Impact
                </Text>
            </Modal.Header>
            <Modal.Body>
                <Badge size="lg" color="primary" variant="bordered" css={{ gap: '$2' }}>
                    <Text css={{ ml: '$5' }}>Общая оценка</Text>
                    <StarRating />
                </Badge>
                <Input bordered fullWidth color="primary" size="lg" placeholder="Имя" />
                <Textarea bordered fullWidth color="primary" size="lg" placeholder="Комметарий" />
            </Modal.Body>
            <Modal.Footer>
                <Button auto onPress={closeHandler}>
                    Отправить
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ReviewModal
