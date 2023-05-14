import { BaseTextField, BaseTextFieldPassword } from '@/shared/ui/Form'
import { Card, Input, Button, Text, Loading } from '@nextui-org/react'
import { Mail, Lock } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FC, useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { SignInFormValues } from '../model'

export interface SignInFormProps {
    onSignIn: (payload: any) => void
    onChangeForm: (payload: 'signUp') => void
}

const SignInForm: FC<SignInFormProps> = ({ onSignIn, onChangeForm }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const form = useForm<SignInFormValues>({
        mode: 'onBlur',
        defaultValues: {},
    })

    const handleSubmit = useCallback(
        async (payload: SignInFormValues) => {
            setLoading(true)
            await signIn('credentials', {
                ...payload,
                redirect: false,
            }).then((data) => {
                if (data?.ok) {
                    router.push('/')
                    setLoading(false)
                } else {
                    toast.error('Неверный Email или пароль')
                    setLoading(false)
                }
            })
        },
        [router]
    )

    const handleChangeForm = useCallback(
        (newForm: Parameters<SignInFormProps['onChangeForm']>[0]) => {
            onChangeForm(newForm)
        },
        [onChangeForm]
    )

    return (
        <>
            <Card.Header css={{ d: 'flex', jc: 'center' }}>
                <Text size={18} css={{ textAlign: 'center' }}>
                    Добро пожаловать в{' '}
                    <Text b size={18}>
                        AnimBook
                    </Text>
                </Text>
            </Card.Header>
            <Card.Body css={{ d: 'flex', fd: 'column', gap: '$12', pb: '$10' }}>
                <FormProvider {...form}>
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
                    <BaseTextFieldPassword
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        name="password"
                        required
                        placeholder="Пароль"
                        contentLeft={<Lock />}
                    />
                </FormProvider>
            </Card.Body>
            <Card.Footer css={{ d: 'flex', jc: 'space-between' }}>
                <Button auto light onPress={handleChangeForm.bind(null, 'signUp')}>
                    Зарегистрироваться
                </Button>
                <Button
                    disabled={loading}
                    auto
                    type="submit"
                    onClick={form.handleSubmit(handleSubmit)}
                >
                    {loading ? <Loading color="currentColor" size="sm" /> : <>Войти</>}
                </Button>
            </Card.Footer>
        </>
    )
}

export default SignInForm
