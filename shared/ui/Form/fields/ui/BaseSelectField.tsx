import { Input, Loading } from '@/shared/ui-kit'
import { FC, useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { SingleValue } from 'react-select'
import AsyncSelect from 'react-select/async'

import { CommonSelectProps, IOption } from '../types'

export interface BaseSelectFieldProps extends CommonSelectProps {
    handleChange?: (value: SingleValue<IOption>) => void
}

export const BaseSelectField: FC<BaseSelectFieldProps> = ({
    name,
    defaultValue,
    handleChange,
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
                    <AsyncSelect
                        {...props}
                        {...field}
                        value={field.value ? { value: field.value, label: field.value } : null}
                        onChange={(value, action) => {
                            field.onChange(value?.label!)
                            handleChange && handleChange(value)
                        }}
                        styles={{
                            container: (defaultStyles) => ({
                                ...defaultStyles,
                                left: 0,
                                width: 'var(--animbook-space-full)',
                            }),
                            indicatorsContainer: (base, props) => ({
                                display: 'none',
                            }),
                            placeholder: (defaultStyles) => ({
                                ...defaultStyles,
                                color: 'var(--animbook-colors-gray600)',
                            }),
                            input: (defaultStyles) => ({
                                ...defaultStyles,
                                color: 'var(--animbook-colors-text)',
                            }),
                            control: (defaultStyles) => ({
                                ...defaultStyles,
                                background: 'transparent',
                                borderRadius: '12px',
                                border: 'var(--animbook-border-width) solid var(--animbook-navbar-border)',
                                ':hover': {
                                    borderColor: fieldState.invalid
                                        ? 'var(--animbook-colors-error)'
                                        : 'var(--animbook-colors-primary)',
                                },
                            }),
                            singleValue: (defaultStyles) => ({
                                ...defaultStyles,
                                color: 'var(--animbook-colors-text)',
                            }),
                            menu: (defaultStyles) => ({
                                ...defaultStyles,
                                position: 'absolute',
                                backgroundColor: 'var(--animbook-colors-gray50)',
                                borderRadius: '12px',
                                border: 'var(--animbook-navbar-border-width) solid var(--animbook-navbar-border)',
                                overflow: 'hidden',
                            }),
                            option: (defaultStyles, state) => ({
                                ...defaultStyles,
                                color: state.isSelected ? 'var(--animbook-colors-primary)' : '',
                                backgroundColor: state.isSelected
                                    ? 'var(--animbook-colors-gray200)'
                                    : '',
                                '&:hover': {
                                    backgroundColor: 'var(--animbook-colors-gray100)',
                                },
                            }),
                        }}
                        cacheOptions
                        loadingMessage={() => <Loading />}
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
