import { MultiValue, SingleValue } from 'react-select'

export interface IOption {
    value: string | number
    label: string | number
}

export interface GroupedOption {
    label: string
    options: IOption[]
}

export type SelectOptionType = MultiValue<IOption> | SingleValue<IOption> | null
