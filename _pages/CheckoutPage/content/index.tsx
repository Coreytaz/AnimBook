import { useOrder } from '@/entities/cart'
import { Button, Col, Loading, Row, Spacer } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { createOrderWithUser } from './api'
import { CustomerInfo } from './customerInfo'
import { DeliveryInfo } from './deliveryInfo'
import { mapFormDataToApiData, OrderFormValues } from './model'
import { YourOrder } from './yourOrder'

export const Content: FC = () => {
    const router = useRouter()
    const { price, cartOrder } = useOrder()
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
                    console.log(payload)
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
                toast.error((error as Error).message)
            } finally {
                setIsLoading(false)
            }
        },
        [cartOrder.cartId, price, router, session?.user]
    )

    return (
        <>
            <YourOrder />
            <Spacer y={1} />
            <Row wrap="wrap" css={{ gap: '$10' }}>
                <CustomerInfo methods={methods} />
                <DeliveryInfo methods={methods} />
            </Row>
            <Spacer y={1} />
            <Button type="submit" onClick={methods.handleSubmit(handleSubmit)}>
                {isLoading ? <Loading color="currentColor" size="sm" /> : <>Оплатить</>}
            </Button>
        </>
    )
}
