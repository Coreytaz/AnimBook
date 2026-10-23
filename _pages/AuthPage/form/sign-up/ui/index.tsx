import { BaseTextField, BaseTextFieldPassword } from '@/shared/ui/Form'
import { Button, Spinner } from '@heroui/react'
import { AxiosError } from 'axios'
import { ArrowRight, Mail, Lock, Phone } from 'lucide-react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from '@heroui/react'
import { signUp } from '../api'
import { mapFormSignUpToApiData, type SignUpFormValues } from '../model'
export interface SignUpFormProps {
    onSignUp?: (payload: unknown) => void
    onChangeForm: (payload: 'signIn') => void
}
export default function SignUpForm({ onChangeForm, onSignUp }: SignUpFormProps) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const form = useForm<SignUpFormValues>({
        mode: 'onBlur',
        defaultValues: { email: '', phone: '', password: '', password2: '' },
    })
    const submit = async (payload: SignUpFormValues) => {
        setLoading(true)
        setError('')
        try {
            const result = await signUp(mapFormSignUpToApiData(payload))
            toast.success('Аккаунт создан. Теперь можно войти.', { timeout: 5000 })
            onSignUp?.(result.data)
        } catch (error) {
            const message = error instanceof AxiosError ? error.response?.data?.message : undefined
            setError(
                typeof message === 'string'
                    ? message
                    : 'Не удалось создать аккаунт. Попробуйте ещё раз.'
            )
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <div className="auth-heading">
                <span className="eyebrow">Начните свою коллекцию</span>
                <h1>Новая глава</h1>
                <p>Создайте аккаунт в AnimBook.</p>
            </div>
            <FormProvider {...form}>
                <form className="auth-form" onSubmit={form.handleSubmit(submit)} noValidate>
                    <BaseTextField
                        name="email"
                        label="Электронная почта"
                        placeholder="you@example.com"
                        type="email"
                        autoComplete="email"
                        required
                        contentLeft={<Mail size={18} />}
                        rules={{
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Введите действительный адрес почты',
                            },
                        }}
                    />
                    <BaseTextField
                        name="phone"
                        label="Номер телефона"
                        placeholder="+7 (999) 123-45-67"
                        type="tel"
                        autoComplete="tel"
                        required
                        contentLeft={<Phone size={18} />}
                    />
                    <BaseTextFieldPassword
                        name="password"
                        label="Пароль"
                        placeholder="Придумайте пароль"
                        autoComplete="new-password"
                        required
                        contentLeft={<Lock size={18} />}
                    />
                    <BaseTextFieldPassword
                        name="password2"
                        label="Повторите пароль"
                        placeholder="Введите пароль ещё раз"
                        autoComplete="new-password"
                        required
                        contentLeft={<Lock size={18} />}
                        rules={{
                            validate: (value) =>
                                value === form.getValues('password') || 'Пароли не совпадают',
                        }}
                    />
                    {error && (
                        <p className="auth-error" role="alert">
                            {error}
                        </p>
                    )}
                    <Button
                        type="submit"
                        className="auth-submit"
                        isDisabled={loading}
                        isPending={loading}
                    >
                        {loading ? (
                            <>
                                <Spinner size="sm" color="current" /> Создаём аккаунт…
                            </>
                        ) : (
                            <>
                                Создать аккаунт <ArrowRight size={18} />
                            </>
                        )}
                    </Button>
                </form>
            </FormProvider>
            <div className="auth-switch">
                <span>Уже с нами?</span>
                <Button variant="ghost" onPress={() => onChangeForm('signIn')}>
                    Войти <ArrowRight size={15} />
                </Button>
            </div>
        </>
    )
}
