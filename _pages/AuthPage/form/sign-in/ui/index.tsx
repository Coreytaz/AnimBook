import { BaseTextField, BaseTextFieldPassword } from '@/shared/ui/Form'
import { Button, Spinner } from '@heroui/react'
import { ArrowRight, Mail, Lock } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import type { SignInFormValues } from '../model'
export interface SignInFormProps {
    onSignIn: (payload: SignInFormValues) => void
    onChangeForm: (payload: 'signUp') => void
}
export default function SignInForm({ onSignIn, onChangeForm }: SignInFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const form = useForm<SignInFormValues>({
        mode: 'onBlur',
        defaultValues: { email: '', password: '' },
    })
    const submit = async (payload: SignInFormValues) => {
        setLoading(true)
        setError('')
        try {
            const result = await signIn('credentials', { ...payload, redirect: false })
            if (result?.ok) {
                onSignIn(payload)
                router.back()
            } else setError('Неверная почта или пароль. Попробуйте ещё раз.')
        } catch {
            setError('Не удалось войти. Попробуйте ещё раз чуть позже.')
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <div className="auth-heading">
                <span className="eyebrow">Рады видеть вас снова</span>
                <h1>С возвращением</h1>
                <p>Войдите, чтобы продолжить свою историю.</p>
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
                    <BaseTextFieldPassword
                        name="password"
                        label="Пароль"
                        placeholder="Введите пароль"
                        autoComplete="current-password"
                        required
                        contentLeft={<Lock size={18} />}
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
                                <Spinner size="sm" color="current" /> Входим…
                            </>
                        ) : (
                            <>
                                Войти в аккаунт <ArrowRight size={18} />
                            </>
                        )}
                    </Button>
                </form>
            </FormProvider>
            <div className="auth-switch">
                <span>Ещё нет аккаунта?</span>
                <Button variant="ghost" onPress={() => onChangeForm('signUp')}>
                    Создать аккаунт <ArrowRight size={15} />
                </Button>
            </div>
        </>
    )
}
