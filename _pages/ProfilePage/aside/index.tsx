import { isEqual } from '@/shared/helpers'
import { useAxiosAuth } from '@/shared/lib/auth'
import { BaseTextField } from '@/shared/ui/Form'
import { Avatar, Button, Card, Loading, Spacer } from '@nextui-org/react'
import { AxiosError } from 'axios'
import { User } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useMemo, useState, useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { routes } from './api'
import { mapFormDataToApiData, UpdateUserFormValues } from './model'

const Aside = () => {
    const axiosAuth = useAxiosAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isEqualent, setIsEqualent] = useState(true)
    const { data: session, update }: any = useSession()
    const mapSession = useMemo(() => mapFormDataToApiData(session?.user), [session?.user])
    const form = useForm<UpdateUserFormValues>({
        mode: 'onBlur',
        defaultValues: useMemo(() => {
            return mapSession
        }, [mapSession]),
    })
    const getValues = form.watch()

    useEffect(() => {
        form.reset(mapSession)
    }, [form, mapSession])

    useEffect(() => {
        if (isEqual(form.formState.defaultValues, getValues)) {
            setIsEqualent(true)
        } else {
            setIsEqualent(false)
        }
    }, [form.formState.defaultValues, getValues])

    const handleSubmit = useCallback(
        async (payload: UpdateUserFormValues) => {
            try {
                setIsLoading(true)
                await axiosAuth.patch(routes.updateUser(), payload, {
                    baseURL: 'http://localhost:5000/api',
                })
                await update({
                    ...session,
                    user: {
                        ...payload,
                    },
                })
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error)
                }
            } finally {
                setIsEdit(false)
                setIsLoading(false)
            }
        },
        [axiosAuth, session, update]
    )

    return (
        <Card
            css={{ mw: '400px', position: 'sticky', left: 0, top: '$24', minWidth: '300px' }}
            variant="bordered"
        >
            <FormProvider {...form}>
                <Card.Header
                    css={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: '$5',
                    }}
                >
                    <Avatar css={{ size: '$40' }} icon={<User size={128} />} />
                    <BaseTextField
                        size="lg"
                        underlined
                        color="primary"
                        name="username"
                        placeholder="ФИО"
                        disabled={!isEdit}
                        css={{ width: '100%' }}
                    />
                </Card.Header>
                <Card.Divider />
                <Card.Body>
                    <Spacer y={1} />
                    <BaseTextField
                        underlined
                        labelPlaceholder="Почта"
                        required
                        type="email"
                        name="email"
                        color="primary"
                        disabled={!isEdit}
                    />
                    <Spacer y={2.5} />
                    <BaseTextField
                        underlined
                        labelPlaceholder="Номер телефона"
                        required
                        type="tel"
                        name="phone"
                        color="primary"
                        disabled={!isEdit}
                    />
                    <Spacer y={2.5} />
                    <BaseTextField
                        underlined
                        type="text"
                        labelPlaceholder="Адрес"
                        name="address"
                        color="primary"
                        disabled={!isEdit}
                    />
                </Card.Body>
            </FormProvider>
            <Card.Divider />
            <Card.Footer css={{ display: 'flex', justifyContent: 'center', gap: '$5' }}>
                {!isEdit ? (
                    <Button onPress={() => setIsEdit(!isEdit)}>Редактировать</Button>
                ) : (
                    <>
                        <Button
                            auto
                            type="submit"
                            onClick={form.handleSubmit(handleSubmit)}
                            disabled={isEqualent || isLoading}
                        >
                            {isLoading ? (
                                <Loading color="currentColor" size="sm" />
                            ) : (
                                <>Сохранить</>
                            )}
                        </Button>
                        <Button auto onPress={() => setIsEdit(!isEdit)} color="error">
                            Отменить
                        </Button>
                    </>
                )}
            </Card.Footer>
        </Card>
    )
}

export default Aside
