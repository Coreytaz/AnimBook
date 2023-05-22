import { BaseTextField, BaseTextFieldPassword } from '@/shared/ui/Form'
import { Button, Card, Text } from '@nextui-org/react'
import { Mail, Phone, Lock, User } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { FC } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { OrderFormValues } from '../model'
import { Section } from '../section'

export const CustomerInfo: FC<{ methods: UseFormReturn<OrderFormValues, any> }> = ({ methods }) => {
    const router = useRouter()
    const { data: session } = useSession()

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
            {!session?.user ? null : (
                <Card.Footer>
                    <Button bordered onPress={() => router.push('profile')}>
                        Редактировать
                    </Button>
                </Card.Footer>
            )}
        </Section>
    )
}
