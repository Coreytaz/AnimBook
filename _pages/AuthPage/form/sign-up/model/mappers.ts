import { ApiSignUpData } from '../api'

import { SignUpFormValues } from './types'

export const mapFormSignUpToApiData = (data: Omit<SignUpFormValues, 'password2'>) => {
    const result: ApiSignUpData = {
        email: data.email,
        password: data.password,
        phone: data.phone,
    }

    return result
}
