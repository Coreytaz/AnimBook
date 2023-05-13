import { InputPasswordProps, InputProps } from '@nextui-org/react'
import { Merge, UseControllerProps } from 'react-hook-form'

export type CommonFieldProps = Merge<
    UseControllerProps,
    {
        name: string
        required?: boolean
    }
>

export type CommonArrayFieldProps = Merge<
    CommonFieldProps,
    {
        fieldArrayName: string
        fieldIndex: number
        field?: any
    }
>

export type CommonTextFieldProps = Merge<
    InputProps,
    CommonFieldProps & { onChange?: InputProps['onChange'] }
>
export type CommonFieldPasswordProps = Merge<
    InputPasswordProps,
    CommonFieldProps & { onChange?: InputProps['onChange'] }
>
