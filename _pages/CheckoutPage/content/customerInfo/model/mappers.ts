import { OrderFormValues } from '../../model'

export const mapFormDataToApiData = (data: OrderFormValues) => {
    const result: Pick<OrderFormValues, 'username' | 'email' | 'phone'> = {
        username: data?.username,
        email: data?.email,
        phone: data?.phone,
    }

    return result
}
