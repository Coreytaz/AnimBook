import { useOrder } from '@/entities/cart'
import { signUp } from '@/_pages/AuthPage/form/sign-up'
import { Button, Card, Spinner } from '@heroui/react'
import { ArrowRight } from 'lucide-react'
import { toRub } from '@/shared/helpers'
import { AxiosError } from 'axios'
import { signIn, useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from '@heroui/react'
import { createOrderWithUser } from './api'
import { CustomerInfo } from './customerInfo'
import { DeliveryInfo } from './deliveryInfo'
import { mapFormDataToApiData, OrderFormValues, mapFormSignUpToApiData } from './model'
import { YourOrder } from './yourOrder'

export const Content: FC = () => {
    const router = useRouter()
    const { price, cartOrder, products } = useOrder()
    const { data: session } = useSession()
    const [isLoading, setIsLoading] = useState(false)
    const mapSession = useMemo(() => mapFormDataToApiData(session?.user as any), [session?.user])

    const methods = useForm<OrderFormValues>({
        mode: 'onBlur',
        defaultValues: useMemo(() => {
            return mapSession
        }, [mapSession]),
    })

    useEffect(() => {
        if (cartOrder.cartId.length === 0) {
            redirect('/cart')
        }
    }, [cartOrder.cartId.length])

    useEffect(() => {
        methods.reset(mapSession)
    }, [methods, mapSession])

    const handleSubmit = useCallback(
        async (payload: OrderFormValues) => {
            try {
                setIsLoading(true)
                if (!session?.user) {
                    const signUpData = await signUp(mapFormSignUpToApiData(payload))
                    const res = await createOrderWithUser({
                        userId: signUpData.data.id,
                        postIndex: payload.postIndex,
                        address: payload.address,
                        apartaments: payload.apartaments,
                        amount: price,
                        products: cartOrder.cartId,
                    })
                    await signIn('credentials', {
                        ...payload,
                        redirect: false,
                    }).then((data) => {
                        if (data?.ok) {
                            router.push(res.data.confirmation.confirmation_url)
                        }
                    })
                } else {
                    const res = await createOrderWithUser({
                        userId: payload.id,
                        postIndex: payload.postIndex,
                        address: payload.address,
                        apartaments: payload.apartaments,
                        amount: price,
                        products: cartOrder.cartId,
                    })
                    router.push(res.data.confirmation.confirmation_url)
                }
            } catch (error) {
                const message = error instanceof AxiosError ? error.response?.data?.message : undefined
                toast.danger(
                    typeof message === 'string'
                        ? message
                        : 'Не удалось создать заказ. Попробуйте ещё раз.',
                    { timeout: 5000 }
                )
            } finally {
                setIsLoading(false)
            }
        },
        [cartOrder.cartId, price, router, session]
    )

    return (
        <div className="checkout-content">
            <YourOrder />
            <form
                className="checkout-form"
                noValidate
                onSubmit={methods.handleSubmit(handleSubmit)}
            >
                <div className="checkout-grid">
                    <CustomerInfo methods={methods} />
                    <DeliveryInfo methods={methods} />
                </div>
                <Card className="checkout-payment">
                    <div>
                        <span>Итого к оплате</span>
                        <strong>{toRub.format(price)}</strong>
                    </div>
                    <Button
                        type="submit"
                        className="checkout-pay-button"
                        isDisabled={
                            isLoading ||
                            products.status === 'loading' ||
                            !products.orderProduct.length
                        }
                        isPending={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Spinner size="sm" color="current" /> Подготавливаем оплату…
                            </>
                        ) : (
                            <>
                                Перейти к оплате <ArrowRight size={18} />
                            </>
                        )}
                    </Button>
                </Card>
            </form>
        </div>
    )
}
