import { BaseTextField } from '@/shared/ui/Form'
import { Button, Card, Spinner } from '@heroui/react'
import { MapPin } from 'lucide-react'
import { useState } from 'react'
import { FormProvider, type UseFormReturn } from 'react-hook-form'
import { toast } from '@heroui/react'
import type { OrderFormValues } from '../model'
import { getGeo } from './api'
import { AddressField } from './addressField'
export function DeliveryInfo({ methods }: { methods: UseFormReturn<OrderFormValues> }) {
    const [locating, setLocating] = useState(false)
    const getCity = () => {
        if (!navigator.geolocation) {
            toast.danger('Геолокация недоступна. Введите адрес вручную.', { timeout: 5000 })
            return
        }
        setLocating(true)
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { data } = await getGeo({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    })
                    const address = data.features[0]?.properties
                    if (!address) throw new Error('Адрес не найден')
                    methods.setValue(
                        'address',
                        [address.city, address.address_line1].filter(Boolean).join(' '),
                        { shouldValidate: true }
                    )
                    methods.setValue('postIndex', address.postcode || '', { shouldValidate: true })
                } catch {
                    toast.danger('Не удалось определить адрес. Введите его вручную.', {
                        timeout: 5000,
                    })
                } finally {
                    setLocating(false)
                }
            },
            () => {
                setLocating(false)
                toast.danger('Не удалось получить геопозицию. Введите адрес вручную.', {
                    timeout: 5000,
                })
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        )
    }
    return (
        <Card className="checkout-panel">
            <div className="checkout-panel-heading">
                <span className="checkout-step">02</span>
                <div>
                    <h2>Адрес доставки</h2>
                    <p>Куда отправить ваши книги</p>
                </div>
            </div>
            <Button
                variant="secondary"
                className="checkout-locate"
                isDisabled={locating}
                onPress={getCity}
            >
                {locating ? <Spinner size="sm" /> : <MapPin size={17} />}
                {locating ? 'Определяем адрес…' : 'Определить местоположение'}
            </Button>
            <FormProvider {...methods}>
                <div className="checkout-fields">
                    <AddressField methods={methods} />
                    <div className="checkout-address-grid">
                        <BaseTextField
                            name="postIndex"
                            label="Почтовый индекс"
                            placeholder="123456"
                            inputMode="numeric"
                            autoComplete="postal-code"
                            required
                        />
                        <BaseTextField
                            name="apartaments"
                            label="Квартира / офис"
                            placeholder="Номер"
                            autoComplete="address-line2"
                            required
                        />
                    </div>
                    <p className="checkout-hint">
                        Проверьте номер дома, квартиры и индекс перед оплатой.
                    </p>
                </div>
            </FormProvider>
        </Card>
    )
}
