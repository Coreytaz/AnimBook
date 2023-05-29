import { StarRating } from '@/entities/StarRating'
import { Badge, Text } from '@nextui-org/react'
import { useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { CommonRatingFieldProps } from '../types'

export interface BaseRatingFieldProps extends CommonRatingFieldProps {}

export const BaseRatingField: React.FC<BaseRatingFieldProps> = ({
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
                    <Badge
                        size="lg"
                        color={fieldState.invalid ? 'error' : 'primary'}
                        variant="bordered"
                        css={{ gap: '$2' }}
                    >
                        <Text css={{ ml: '$5' }}>Общая оценка</Text>
                        <StarRating
                            {...props}
                            {...field}
                            rating={field.value}
                            setRating={(value) => {
                                field.onChange(value)
                                onChange && onChange(value as any)
                            }}
                        />
                    </Badge>
                )
            }}
            rules={{
                required: computedRequired,
                ...rules,
            }}
        />
    )
}
