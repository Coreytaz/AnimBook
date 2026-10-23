import { useAxiosAuth } from '@/shared/lib/auth'
import {
    Button,
    Card,
    FieldError,
    InputGroup,
    Label,
    Spinner,
    TextField,
    toast,
} from '@heroui/react'
import { Check, Mail, MapPin, Pencil, Phone, UserRound } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { routes } from './api'
import { UpdateUserFormValues } from './model'
import styles from '../styles.module.css'

const fields = [
    {
        name: 'username',
        label: 'ФИО',
        placeholder: 'Фамилия, имя и отчество',
        type: 'text',
        autoComplete: 'name',
        Icon: UserRound,
        required: true,
    },
    {
        name: 'email',
        label: 'Электронная почта',
        placeholder: 'you@example.com',
        type: 'email',
        autoComplete: 'email',
        Icon: Mail,
        required: true,
    },
    {
        name: 'phone',
        label: 'Номер телефона',
        placeholder: '+7 (999) 123-45-67',
        type: 'tel',
        autoComplete: 'tel',
        Icon: Phone,
        required: true,
    },
    {
        name: 'address',
        label: 'Адрес доставки',
        placeholder: 'Город, улица, дом, квартира',
        type: 'text',
        autoComplete: 'street-address',
        Icon: MapPin,
        required: false,
    },
] as const

export default function Aside() {
    const axiosAuth = useAxiosAuth()
    const { data: session, update } = useSession()
    const [isEdit, setIsEdit] = useState(false)
    const [error, setError] = useState('')
    const values = useMemo(
        () => ({
            username: session?.user?.username ?? '',
            email: session?.user?.email ?? '',
            phone: session?.user?.phone ?? '',
            address: session?.user?.address ?? '',
        }),
        [
            session?.user?.username,
            session?.user?.email,
            session?.user?.phone,
            session?.user?.address,
        ]
    )
    const form = useForm<UpdateUserFormValues>({ mode: 'onBlur', defaultValues: values })
    const { isDirty, isSubmitting } = form.formState

    useEffect(() => {
        form.reset(values)
    }, [form, values])

    const submit = async (payload: UpdateUserFormValues) => {
        setError('')
        try {
            await axiosAuth.patch(routes.updateUser(), payload)
            await update({ ...session, user: { ...session?.user, ...payload } })
            form.reset(payload)
            setIsEdit(false)
            toast.success('Личные данные сохранены')
        } catch {
            setError('Не удалось сохранить данные. Попробуйте ещё раз.')
        }
    }

    return (
        <Card className={styles.personal}>
            <div className={styles.identity}>
                <span className={styles.avatar}>
                    <UserRound size={28} aria-hidden="true" />
                </span>
                <div>
                    <span className={styles.eyebrow}>Рады видеть вас</span>
                    <h2>{values.username || 'Читатель AnimBook'}</h2>
                    <p>Ваша личная книжная полка</p>
                </div>
            </div>
            <form onSubmit={form.handleSubmit(submit)} noValidate>
                <div className={styles.formHeading}>
                    <h3>Личные данные</h3>
                    <span>{isEdit ? 'Редактирование' : 'Данные покупателя'}</span>
                </div>
                <div className={styles.fields}>
                    {fields.map(
                        ({ name, label, placeholder, type, autoComplete, Icon, required }) => (
                            <Controller
                                key={name}
                                name={name}
                                control={form.control}
                                rules={{
                                    required: required ? 'Заполните это поле' : false,
                                    ...(name === 'email'
                                        ? {
                                              pattern: {
                                                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                  message: 'Введите действительный адрес почты',
                                              },
                                          }
                                        : {}),
                                }}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        isReadOnly={!isEdit}
                                        isDisabled={isSubmitting}
                                        isRequired={required}
                                        isInvalid={fieldState.invalid}
                                        validationBehavior="aria"
                                    >
                                        <Label>{label}</Label>
                                        <InputGroup fullWidth>
                                            <InputGroup.Prefix>
                                                <Icon size={18} aria-hidden="true" />
                                            </InputGroup.Prefix>
                                            <InputGroup.Input
                                                {...field}
                                                type={type}
                                                placeholder={placeholder}
                                                autoComplete={autoComplete}
                                            />
                                        </InputGroup>
                                        <FieldError>{fieldState.error?.message}</FieldError>
                                    </TextField>
                                )}
                            />
                        )
                    )}
                </div>
                <p className={styles.hint}>
                    Используем эти данные для связи и доставки ваших заказов.
                </p>
                {error && (
                    <p className={styles.error} role="alert">
                        {error}
                    </p>
                )}
                <div className={styles.actions}>
                    {isEdit ? (
                        <>
                            <Button
                                type="submit"
                                isDisabled={!isDirty || isSubmitting}
                                isPending={isSubmitting}
                            >
                                {isSubmitting ? <Spinner size="sm" /> : <Check size={17} />}{' '}
                                {isSubmitting ? 'Сохраняем…' : 'Сохранить изменения'}
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                isDisabled={isSubmitting}
                                onPress={() => {
                                    form.reset(values)
                                    setError('')
                                    setIsEdit(false)
                                }}
                            >
                                Отмена
                            </Button>
                        </>
                    ) : (
                        <Button
                            type="button"
                            fullWidth
                            variant="secondary"
                            onPress={() => setIsEdit(true)}
                        >
                            <Pencil size={16} /> Редактировать данные
                        </Button>
                    )}
                </div>
            </form>
        </Card>
    )
}
