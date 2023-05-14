import { BaseTextField, BaseTextFieldPassword } from '@/shared/ui/Form'
import { Card, Button, Text } from '@nextui-org/react'
import { AxiosError } from 'axios'
import { Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react'
import React, { FC, useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { signUp } from '../api'
import { mapFormDataToApiData, SignUpFormValues } from '../model'

export interface SignUpFormProps {
    onSignUp?: (payload: unknown) => void
    onChangeForm: (payload: 'signIn') => void
}

const SignUpForm: FC<SignUpFormProps> = ({ onChangeForm, onSignUp }) => {
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<SignUpFormValues>({
        mode: 'onBlur',
        defaultValues: {},
    })

    const handleChangeForm = useCallback(
        (newForm: Parameters<SignUpFormProps['onChangeForm']>[0]) => {
            onChangeForm(newForm)
        },
        [onChangeForm]
    )

    const handleSubmit = useCallback(
        async (payload: SignUpFormValues) => {
            try {
                const res = await signUp(mapFormDataToApiData(payload))
                onSignUp && onSignUp(res.data)
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error)
                    if (error.response?.status === 400 && error.code === 'ERR_BAD_REQUEST') {
                        const mes = error.response.data.message as string
                        toast.error(mes)
                    }
                }
            }
        },
        [onSignUp]
    )

    const validateRepeatPassword = useCallback(
        (v: string) => {
            const pass = form.getValues('password')

            return v === pass || 'Пароли не совпадают!'
        },
        [form]
    )

    return (
        <>
            <Card.Header css={{ d: 'flex', jc: 'center' }}>
                <Text size={18} css={{ textAlign: 'center' }}>
                    Регистрироваться в{' '}
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
                        type={showPassword ? 'text' : 'password'}
                        hiddenIcon={<Eye onClick={() => setShowPassword(!showPassword)} />}
                        visibleIcon={
                            <EyeOff
                                className="cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        }
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
                    <BaseTextField
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        name="password2"
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Повторите пароль"
                        contentLeft={<Lock />}
                        rules={{
                            validate: validateRepeatPassword,
                        }}
                    />
                </FormProvider>
            </Card.Body>
            <Card.Footer css={{ d: 'flex', jc: 'space-between' }}>
                <Button auto light onPress={handleChangeForm.bind(null, 'signIn')}>
                    Войти
                </Button>
                <Button type="submit" onClick={form.handleSubmit(handleSubmit)} auto>
                    Зарегистрироваться
                </Button>
            </Card.Footer>
        </>
    )
}

export default SignUpForm
