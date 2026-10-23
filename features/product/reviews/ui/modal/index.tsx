import { BaseTextAreaFileld } from '@/shared/ui/Form'
import { BaseRatingField } from '@/shared/ui/Form/fields/ui/BaseRatingField'
import { Modal, Button } from '@/shared/ui-kit'
import { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from '@heroui/react'
import { reviewsApi } from '../../api'
import { ReviewFormValues } from './model'

const ReviewModal: FC<{
    visible: boolean
    setVisible: Dispatch<SetStateAction<boolean>>
}> = ({ visible, setVisible }) => {
    const params = useParams()
    const { data: session } = useSession()
    const userId = useMemo(() => session?.user?.id!, [session?.user?.id])
    const [createReview, { data, isSuccess }] = reviewsApi.useAddReviewsMutation()
    const closeHandler = useCallback(() => {
        setVisible(false)
    }, [setVisible])

    const form = useForm<ReviewFormValues>({
        mode: 'onBlur',
        defaultValues: {},
    })

    useEffect(() => {
        if (isSuccess) {
            closeHandler()
        }
    }, [closeHandler, isSuccess])

    const handleSubmit = useCallback(
        async (payload: ReviewFormValues) => {
            try {
                await createReview({
                    discription: payload.discription,
                    rating: payload.rating,
                    userId,
                    slug: params?.slug?.toString()!,
                }).unwrap()
                form.reset()
            } catch (error: any) {
                toast.danger(error.data.message, { timeout: 5000 })
            }
        },
        [createReview, form, params, userId]
    )

    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            preventClose
            open={visible}
            blur
            onClose={closeHandler}
        >
            <Modal.Header css={{ display: 'block' }}>
                <Modal.Heading id="modal-title">Мой отзыв</Modal.Heading>
            </Modal.Header>
            <Modal.Body css={{ d: 'flex', fd: 'column', gap: '$5', pb: '$10' }}>
                <FormProvider {...form}>
                    <BaseRatingField name="rating" required />
                    <BaseTextAreaFileld
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        name="discription"
                        required
                        placeholder="Комметарий"
                    />
                </FormProvider>
            </Modal.Body>
            <Modal.Footer>
                <Button auto onClick={form.handleSubmit(handleSubmit)}>
                    Отправить
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ReviewModal
