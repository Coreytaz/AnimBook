import { Input, Textarea } from '@nextui-org/react'
import { useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { CommonTextAreaFileldProps } from '../types'

export interface BaseTextAreaFileldProps extends CommonTextAreaFileldProps {}

export const BaseTextAreaFileld: React.FC<BaseTextAreaFileldProps> = ({
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
                    <Textarea
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
