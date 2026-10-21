'use client'

import * as UI from '@heroui/react'
import { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode, forwardRef, useState } from 'react'
import { Color } from './components'
import { StyledProps, withStyles } from './styles'

type FieldOptions = StyledProps & {
    label?: ReactNode
    labelPlaceholder?: string
    color?: Color
    status?: string
    helperText?: ReactNode
    helperColor?: string
    bordered?: boolean
    clearable?: boolean
    contentLeft?: ReactNode
    contentRight?: ReactNode
    contentLeftStyling?: boolean
    contentRightStyling?: boolean
    underlined?: boolean
    fullWidth?: boolean
    rounded?: boolean
    shadow?: boolean
    size?: 'sm' | 'md' | 'lg'
    onClear?: () => void
}
export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'color' | 'size'> &
    FieldOptions
export type InputPasswordProps = InputProps & {
    visibleIcon?: ReactNode
    hiddenIcon?: ReactNode
    initialIsVisible?: boolean
}
export type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'color'> &
    FieldOptions
export type FormElement = HTMLInputElement

const InputRoot = withStyles(
    forwardRef<HTMLInputElement, InputProps>(function Input(
        {
            label,
            labelPlaceholder,
            status,
            helperText,
            helperColor,
            bordered,
            clearable,
            contentLeft,
            contentRight,
            contentLeftStyling,
            contentRightStyling,
            underlined,
            fullWidth,
            rounded,
            shadow,
            size,
            color,
            onClear,
            className,
            disabled,
            required,
            ...props
        },
        ref
    ) {
        const fieldLabel = labelPlaceholder || label
        return (
            <UI.TextField
                className={`w-full ${className || ''}`}
                isInvalid={status === 'error'}
                isDisabled={disabled}
                isRequired={required}
                validationBehavior="aria"
                aria-label={
                    fieldLabel ? undefined : props['aria-label'] || props.placeholder || props.name
                }
            >
                {fieldLabel && <UI.Label>{fieldLabel}</UI.Label>}
                <UI.InputGroup
                    fullWidth
                    className={`${bordered ? 'border border-border' : ''} ${underlined ? 'rounded-none border-b border-border' : ''} ${rounded ? 'rounded-full' : ''}`}
                >
                    {contentLeft && <UI.InputGroup.Prefix>{contentLeft}</UI.InputGroup.Prefix>}
                    <UI.InputGroup.Input {...props} ref={ref} />
                    {contentRight || (clearable && props.value && onClear) ? (
                        <UI.InputGroup.Suffix>
                            {clearable && props.value && onClear ? (
                                <UI.Button
                                    variant="ghost"
                                    size="sm"
                                    isIconOnly
                                    type="button"
                                    aria-label="Очистить поле"
                                    onPress={onClear}
                                >
                                    ×
                                </UI.Button>
                            ) : null}
                            {contentRight}
                        </UI.InputGroup.Suffix>
                    ) : null}
                </UI.InputGroup>
                {helperText && <UI.FieldError>{helperText}</UI.FieldError>}
            </UI.TextField>
        )
    })
)
const Password = forwardRef<HTMLInputElement, InputPasswordProps>(function Password(
    { visibleIcon, hiddenIcon, initialIsVisible, ...props },
    ref
) {
    const [visible, setVisible] = useState(initialIsVisible || false)
    return (
        <InputRoot
            {...props}
            ref={ref}
            clearable={false}
            type={visible ? 'text' : 'password'}
            contentRight={
                <UI.Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    aria-label={visible ? 'Скрыть пароль' : 'Показать пароль'}
                    onPress={() => setVisible(!visible)}
                >
                    {visible ? visibleIcon || 'Скрыть' : hiddenIcon || 'Показать'}
                </UI.Button>
            }
        />
    )
})
export const Input = Object.assign(InputRoot, { Password })
export const Textarea = withStyles(
    forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
        {
            label,
            labelPlaceholder,
            status,
            helperText,
            helperColor,
            bordered,
            clearable,
            contentLeft,
            contentRight,
            contentLeftStyling,
            contentRightStyling,
            underlined,
            fullWidth,
            rounded,
            shadow,
            size,
            color,
            onClear,
            className,
            disabled,
            required,
            ...props
        },
        ref
    ) {
        const fieldLabel = labelPlaceholder || label
        return (
            <UI.TextField
                className={`w-full ${className || ''}`}
                isInvalid={status === 'error'}
                isDisabled={disabled}
                isRequired={required}
                validationBehavior="aria"
                aria-label={
                    fieldLabel ? undefined : props['aria-label'] || props.placeholder || props.name
                }
            >
                {fieldLabel && <UI.Label>{fieldLabel}</UI.Label>}
                <UI.TextArea
                    {...props}
                    ref={ref}
                    fullWidth
                    className={bordered ? 'border border-border' : ''}
                />
                {helperText && <UI.FieldError>{helperText}</UI.FieldError>}
            </UI.TextField>
        )
    })
)

type SwitchProps = Omit<UI.SwitchProps, 'children' | 'size' | 'onChange'> & {
    children?: ReactNode
    initialChecked?: boolean
    checked?: boolean
    animated?: boolean
    squared?: boolean
    iconOn?: ReactNode
    iconOff?: ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl'
    onValueChange?: (selected: boolean) => void
}
export const Switch = withStyles(
    ({
        initialChecked,
        checked,
        animated,
        squared,
        iconOn,
        iconOff,
        size,
        onValueChange,
        children,
        ...props
    }: SwitchProps) => (
        <UI.Switch
            {...props}
            defaultSelected={initialChecked}
            isSelected={checked ?? props.isSelected}
            onChange={onValueChange}
            size={size === 'xl' ? 'lg' : size}
        >
            <UI.Switch.Content aria-label={props['aria-label'] || 'Переключить'}>
                {({ isSelected }) => (
                    <>
                        <UI.Switch.Control>
                            <UI.Switch.Thumb>
                                <UI.Switch.Icon>{isSelected ? iconOn : iconOff}</UI.Switch.Icon>
                            </UI.Switch.Thumb>
                        </UI.Switch.Control>
                        {children && <UI.Label>{children}</UI.Label>}
                    </>
                )}
            </UI.Switch.Content>
        </UI.Switch>
    )
)
const CheckboxRoot = withStyles(
    ({
        color,
        children,
        ...props
    }: Omit<UI.CheckboxProps, 'children'> & { color?: Color; children?: ReactNode }) => (
        <UI.Checkbox {...props}>
            <UI.Checkbox.Content>
                <UI.Checkbox.Control>
                    <UI.Checkbox.Indicator />
                </UI.Checkbox.Control>
                <UI.Label>{children}</UI.Label>
            </UI.Checkbox.Content>
        </UI.Checkbox>
    )
)
export const Checkbox = Object.assign(CheckboxRoot, {
    Group: withStyles(({ color, ...props }: UI.CheckboxGroupProps & { color?: Color }) => (
        <UI.CheckboxGroup {...props} aria-label={props['aria-label'] || 'Фильтры'} />
    )),
})
