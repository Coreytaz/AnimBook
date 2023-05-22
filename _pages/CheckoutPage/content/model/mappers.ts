import { OrderFormValues } from '.'

export const mapFormDataToApiData = (data: OrderFormValues) => {
    const result: Omit<OrderFormValues, 'password'> = {
        username: data?.username,
        email: data?.email,
        phone: data?.phone,
        postalIndex: data?.postalIndex,
        apartaments: data?.apartaments,
        address: data?.address,
    }

    return result
}
