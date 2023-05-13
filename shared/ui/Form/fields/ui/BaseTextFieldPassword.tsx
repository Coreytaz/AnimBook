import { Input } from '@nextui-org/react'
import { useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { CommonFieldPasswordProps } from '../types'

export interface BaseTextFieldPasswordProps extends CommonFieldPasswordProps {}

export const BaseTextFieldPassword: React.FC<BaseTextFieldPasswordProps> = ({
    name,
    onChange,
    defaultValue,
    rules = {},
    required,
    ...props
}) => {
    const { control } = useFormContext()

    const computedRequired = useMemo(() => {
        if (!required) {
            return false
        }

        if (typeof required === 'string') {
            return required
        }

        return 'Поле, обязательное для заполнения'
    }, [required])

    return (
        <Controller
            control={control}
            name={name!}
            defaultValue={defaultValue || ''}
            render={({ field, fieldState }) => {
                return (
                    <Input.Password
                        {...props}
                        {...field}
                        color={fieldState.invalid ? 'error' : 'primary'}
                        status={fieldState.invalid ? 'error' : 'default'}
                        helperText={fieldState?.error?.message}
                        helperColor={'error'}
                        onChange={(value) => {
                            field.onChange(value)
                            onChange && onChange(value)
                        }}
                    />
                )
            }}
            rules={{
                required: computedRequired,
                ...rules,
            }}
        />
    )
}
