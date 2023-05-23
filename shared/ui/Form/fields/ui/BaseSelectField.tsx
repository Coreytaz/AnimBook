import { Input, Loading } from '@nextui-org/react'
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
                        value={{ value: field.value, label: field.value } || undefined}
                        onChange={(value, action) => {
                            field.onChange(value?.label!)
                            handleChange && handleChange(value)
                        }}
                        styles={{
                            container: (defaultStyles) => ({
                                ...defaultStyles,
                                left: 0,
                                width: 'var(--nextui-space-full)',
                            }),
                            indicatorsContainer: (base, props) => ({
                                display: 'none',
                            }),
                            placeholder: (defaultStyles) => ({
                                ...defaultStyles,
                                color: 'var(--nextui-colors-gray600)',
                            }),
                            input: (defaultStyles) => ({
                                ...defaultStyles,
                                color: 'var(--nextui-colors-text)',
                            }),
                            control: (defaultStyles) => ({
                                ...defaultStyles,
                                background: 'transparent',
                                borderRadius: '12px',
                                border: 'var(--nextui-borderWeights-normal) solid var(--nextui--navbarBorderColor)',
                                ':hover': {
                                    borderColor: fieldState.invalid
                                        ? 'var(--nextui-colors-error)'
                                        : 'var(--nextui-colors-primary)',
                                },
                            }),
                            singleValue: (defaultStyles) => ({
                                ...defaultStyles,
                                color: 'var(--nextui-colors-text)',
                            }),
                            menu: (defaultStyles) => ({
                                ...defaultStyles,
                                position: 'absolute',
                                backgroundColor: 'var(--nextui-colors-gray50)',
                                borderRadius: '12px',
                                border: 'var(--nextui--navbarBorderWeight) solid var(--nextui--navbarBorderColor)',
                                overflow: 'hidden',
                            }),
                            option: (defaultStyles, state) => ({
                                ...defaultStyles,
                                color: state.isSelected ? 'var(--nextui-colors-primary)' : '',
                                backgroundColor: state.isSelected
                                    ? 'var(--nextui-colors-gray200)'
                                    : '',
                                '&:hover': {
                                    backgroundColor: 'var(--nextui-colors-gray100)',
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
