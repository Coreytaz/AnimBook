import { BaseSelectField, BaseTextField } from '@/shared/ui/Form'
import { Button, Card, Row } from '@nextui-org/react'
import { MapPin } from 'lucide-react'
import { FC } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { toast } from 'react-toastify'
import { OrderFormValues } from '../model'
import { Section } from '../section'
import { getAddres, getGeo } from './api'

export interface IOption {
    value: string
    label: string
    postalIndex?: string
}

export const DeliveryInfo: FC<{ methods: UseFormReturn<OrderFormValues, any> }> = ({ methods }) => {
    const getCity = () => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
        const success = async (pos: GeolocationPosition) => {
            try {
                const { latitude, longitude } = pos.coords

                const { data } = await getGeo({ latitude, longitude })
                methods.setValue(
                    'address',
                    `${data.features[0].properties.city} ${data.features[0].properties.address_line1}`
                )
                methods.setValue('postalIndex', data.features[0].properties.postcode)
            } catch (error) {
                toast.error((error as Error).message)
            }
        }

        const error = (error: GeolocationPositionError) =>
            toast.error('Не удалось получить геопозицию')

        navigator.geolocation.getCurrentPosition(success, error, options)
    }

    const promiseOptions = (inputValue: string) =>
        new Promise<IOption[]>(async (resolve) => {
            const res = await getAddres(inputValue)
            return resolve(
                res.data.suggestions.map((item) => {
                    return {
                        value: item.value,
                        label: item.value,
                        postalIndex: item.data.postal_code || '',
                    }
                })
            )
        })

    return (
        <Section title="Выберите ваш адрес" css={{ fd: 'column', maxW: '450px', gap: 0 }}>
            <Card.Header>
                <Button bordered icon={<MapPin />} auto onPress={() => getCity()}>
                    Определить место
                </Button>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ gap: '$10' }}>
                <FormProvider {...methods}>
                    <Row css={{ gap: '$5' }}>
                        <BaseTextField
                            clearable
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            name="postalIndex"
                            type="text"
                            required
                            placeholder="Почтовый индекс"
                        />
                        <BaseTextField
                            clearable
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            name="apartaments"
                            type="text"
                            required
                            placeholder="Квартира"
                        />
                    </Row>
                    <BaseSelectField
                        placeholder="Адрес"
                        name="address"
                        required
                        handleChange={(value) => {
                            methods.setValue('postalIndex', value?.postalIndex!)
                        }}
                        loadOptions={promiseOptions}
                        noOptionsMessage={() => 'Адрес не найден'}
                    />
                </FormProvider>
            </Card.Body>
        </Section>
    )
}
