import { ApiSignUpData, SignUpFormValues } from '@/_pages/AuthPage/form/sign-up'
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

export const mapFormSignUpToApiData = (
    data: Omit<SignUpFormValues, 'password2'> & { username: string }
) => {
    const result: ApiSignUpData & { username: string } = {
        username: data.username,
        email: data.email,
        password: data.password,
        phone: data.phone,
    }

    return result
}
