import { ApiUpdateUserData } from '../api'

import { UpdateUserFormValues } from './types'

export const mapFormDataToApiData = (data: UpdateUserFormValues) => {
    const result: ApiUpdateUserData = {
        username: data?.username,
        address: data?.address,
        email: data?.email,
        phone: data?.phone,
    }

    return result
}
