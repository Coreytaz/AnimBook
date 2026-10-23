export interface IOption {
    value: string | number
    label: string | number
}

export interface GroupedOption {
    label: string
    options: IOption[]
}
