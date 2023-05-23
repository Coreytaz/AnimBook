import { Button, Col, Loading, Row, Spacer } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CustomerInfo } from './customerInfo'
import { DeliveryInfo } from './deliveryInfo'
import { mapFormDataToApiData, OrderFormValues } from './model'
import { YourOrder } from './yourOrder'

export const Content: FC = () => {
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
        methods.reset(mapSession)
    }, [methods, mapSession])

    const handleSubmit = useCallback(async (payload: OrderFormValues) => {
        console.log(payload)
    }, [])

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
