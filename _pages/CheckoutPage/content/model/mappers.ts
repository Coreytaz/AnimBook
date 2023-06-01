import { OrderFormValues } from '.'

export const mapFormDataToApiData = (data: OrderFormValues) => {
    const result: Pick<OrderFormValues, 'id' | 'postIndex' | 'apartaments' | 'address'> = {
        id: data?.id,
        postIndex: data?.postIndex,
        apartaments: data?.apartaments,
        address: data?.address,
    }

    return result
}
