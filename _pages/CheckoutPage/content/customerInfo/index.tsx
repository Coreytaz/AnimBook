import { BaseTextField, BaseTextFieldPassword } from '@/shared/ui/Form'
import { Button, Card } from '@heroui/react'
import { Mail, Phone, Lock, User, LogIn } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { FormProvider, type UseFormReturn } from 'react-hook-form'
import type { OrderFormValues } from '../model'
export function CustomerInfo({ methods }: { methods: UseFormReturn<OrderFormValues> }) {
    const { data: session } = useSession()
    return (
        <Card className="checkout-panel">
            <div className="checkout-panel-heading">
                <span className="checkout-step">01</span>
                <div>
                    <h2>Данные покупателя</h2>
                    <p>Для связи и уведомлений о заказе</p>
                </div>
            </div>
            {!session?.user ? (
                <>
                    <div className="checkout-signin">
                        <span>Уже есть аккаунт?</span>
                        <Button variant="ghost" onPress={() => signIn()}>
                            <LogIn size={16} /> Войти
                        </Button>
                    </div>
                    <FormProvider {...methods}>
                        <div className="checkout-fields">
                            <BaseTextField
                                name="username"
                                label="ФИО"
                                placeholder="Фамилия, имя и отчество"
                                autoComplete="name"
                                required
                                contentLeft={<User size={18} />}
                            />
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
                                label="Пароль для аккаунта"
                                placeholder="Придумайте пароль"
                                autoComplete="new-password"
                                required
                                contentLeft={<Lock size={18} />}
                            />
                            <p className="checkout-hint">
                                Создадим аккаунт, чтобы вы могли следить за заказом.
                            </p>
                        </div>
                    </FormProvider>
                </>
            ) : (
                <div className="checkout-customer">
                    <dl>
                        <div>
                            <dt>ФИО</dt>
                            <dd>{session.user.username}</dd>
                        </div>
                        <div>
                            <dt>Почта</dt>
                            <dd>{session.user.email}</dd>
                        </div>
                        <div>
                            <dt>Телефон</dt>
                            <dd>{session.user.phone}</dd>
                        </div>
                    </dl>
                    <Link href="/profile" className="text-link">
                        Изменить данные
                    </Link>
                </div>
            )}
        </Card>
    )
}
