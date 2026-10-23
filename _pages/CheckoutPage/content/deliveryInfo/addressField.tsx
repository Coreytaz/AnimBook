import { ComboBox, FieldError, Input, Label, ListBox, Spinner } from '@heroui/react'
import { useEffect, useState } from 'react'
import { useController, type UseFormReturn } from 'react-hook-form'
import type { OrderFormValues } from '../model'
import { getAddres } from './api'

type AddressOption = { value: string; postalIndex: string }
export function AddressField({ methods }: { methods: UseFormReturn<OrderFormValues> }) {
    const { field, fieldState } = useController({
        name: 'address',
        control: methods.control,
        defaultValue: '',
        rules: { required: 'Укажите адрес доставки' },
    })
    const [options, setOptions] = useState<AddressOption[]>([])
    const [selected, setSelected] = useState<AddressOption | null>(null)
    const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')
    const query = field.value || ''
    useEffect(() => {
        let active = true
        if (selected?.value === query) return
        setOptions([])
        if (query.trim().length < 3) {
            setStatus('idle')
            return
        }
        setStatus('loading')
        const timer = setTimeout(async () => {
            try {
                const { data } = await getAddres(query.trim())
                if (!active) return
                setOptions([
                    ...new Map(
                        data.suggestions.map((item) => [
                            item.value,
                            { value: item.value, postalIndex: item.data.postal_code || '' },
                        ])
                    ).values(),
                ])
                setStatus('ready')
            } catch {
                if (active) setStatus('error')
            }
        }, 300)
        return () => {
            active = false
            clearTimeout(timer)
        }
    }, [query, selected?.value])
    return (
        <ComboBox
            className="checkout-address-combobox"
            name={field.name}
            inputValue={query}
            onInputChange={(value) => {
                if (selected && value !== selected.value) setSelected(null)
                field.onChange(value)
            }}
            selectedKey={selected?.value ?? null}
            onSelectionChange={(key) => {
                const option = options.find((item) => item.value === key)
                if (!option) return
                setSelected(option)
                field.onChange(option.value)
                methods.setValue('postIndex', option.postalIndex, {
                    shouldValidate: true,
                    shouldDirty: true,
                })
            }}
            onBlur={field.onBlur}
            items={options}
            defaultFilter={() => true}
            allowsCustomValue
            allowsEmptyCollection
            menuTrigger="input"
            isRequired
            isInvalid={fieldState.invalid}
            validationBehavior="aria"
        >
            <Label>Город, улица и дом</Label>
            <ComboBox.InputGroup>
                <Input
                    ref={field.ref}
                    placeholder="Начните вводить адрес"
                    autoComplete="street-address"
                />
                <ComboBox.Trigger aria-label="Показать подсказки адреса" />
            </ComboBox.InputGroup>
            <ComboBox.Popover className="checkout-address-popover" placement="bottom start">
                <ListBox
                    aria-label="Подсказки адреса"
                    items={options}
                    renderEmptyState={() => (
                        <div className="checkout-address-status" role="status">
                            {status === 'loading' ? (
                                <>
                                    <Spinner size="sm" /> Ищем адрес…
                                </>
                            ) : status === 'idle' ? (
                                'Введите минимум 3 символа'
                            ) : status === 'error' ? (
                                'Подсказки недоступны. Введите адрес вручную.'
                            ) : (
                                'Адрес не найден. Можно ввести его вручную.'
                            )}
                        </div>
                    )}
                >
                    {(option) => (
                        <ListBox.Item id={option.value} textValue={option.value}>
                            <Label>{option.value}</Label>
                            <ListBox.ItemIndicator />
                        </ListBox.Item>
                    )}
                </ListBox>
            </ComboBox.Popover>
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
        </ComboBox>
    )
}
