import { BaseTextField, BaseTextFieldPassword } from '@/shared/ui/Form'
import { Button, Card, Text } from '@nextui-org/react'
import { Mail, Phone, Lock, User } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import { FC, useEffect, useMemo } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { OrderFormValues } from '../model'
import { Section } from '../section'
import { mapFormDataToApiData } from './model'

export const CustomerInfo: FC<{ methods: UseFormReturn<OrderFormValues, any> }> = ({ methods }) => {
    const { data: session } = useSession()
    const mapSession = useMemo(() => mapFormDataToApiData(session?.user as any), [session?.user])

    useEffect(() => {
        methods.reset(mapSession)
    }, [methods, mapSession])

    return (
        <Section title="Данные покупателя" css={{ fd: 'column', maxW: '450px', gap: 0 }}>
            <Card.Header>
                {!session?.user ? (
                    <Button bordered onPress={() => signIn()}>
                        Есть учетная запись? Войти
                    </Button>
                ) : (
                    <Text h3 css={{ textAlign: 'center' }}>
                        Ваши данные
                    </Text>
                )}
            </Card.Header>
            <Card.Body css={{ d: 'flex', fd: 'column', gap: '$12', pb: '$10' }}>
                <FormProvider {...methods}>
                    {!session?.user ? (
                        <>
                            <BaseTextField
                                clearable
                                bordered
                                fullWidth
                                color="primary"
                                size="lg"
                                name="username"
                                type="text"
                                required
                                placeholder="ФИО"
                                contentLeft={<User />}
                            />
                            <BaseTextField
                                clearable
                                bordered
                                fullWidth
                                color="primary"
                                size="lg"
                                name="email"
                                type="email"
                                required
                                placeholder="Почта"
                                contentLeft={<Mail />}
                                rules={{
                                    pattern: {
                                        message: 'Введите действительный адрес электронной почты',
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i,
                                    },
                                }}
                            />
                            <BaseTextField
                                clearable
                                bordered
                                fullWidth
                                color="primary"
                                size="lg"
                                name="phone"
                                type="phone"
                                required
                                placeholder="Номер телефона"
                                contentLeft={<Phone />}
                            />
                            <BaseTextFieldPassword
                                clearable
                                bordered
                                fullWidth
                                required
                                color="primary"
                                size="lg"
                                name="password"
                                placeholder="Пароль"
                                contentLeft={<Lock />}
                            />
                        </>
                    ) : (
                        <>
                            <Text size="$xl">
                                ФИО: <Text b>{session?.user.username}</Text>
                            </Text>
                            <Text size="$xl">
                                Почта: <Text b>{session?.user.email}</Text>
                            </Text>
                            <Text size="$xl">
                                Телефон: <Text b>{session?.user.phone}</Text>
                            </Text>
                        </>
                    )}
                </FormProvider>
            </Card.Body>
        </Section>
    )
}
