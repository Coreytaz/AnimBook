'use client'

import { Card, Container } from '@nextui-org/react'
import { FC, useCallback, useState } from 'react'
import SignInForm, { SignInFormProps } from './form/sign-in/ui'
import SignUpForm, { SignUpFormProps } from './form/sign-up/ui'

type LoginPageForm = 'signIn' | 'signUp'

const AuthPage: FC = () => {
    const [currentForm, setCurrentForm] = useState<LoginPageForm>('signIn')

    const handleSignIn: SignInFormProps['onSignIn'] = useCallback(() => {}, [])

    const handleChangeForm = useCallback((payload: LoginPageForm) => {
        setCurrentForm(payload)
    }, [])

    const handleSignUp = useCallback<NonNullable<SignUpFormProps['onSignUp']>>(() => {
        setCurrentForm('signIn')
    }, [])

    return (
        <Container lg justify="center" display="flex" alignItems="center" css={{ height: '75vh' }}>
            <Card css={{ maxWidth: '500px' }}>
                {currentForm === 'signIn' && (
                    <SignInForm onSignIn={handleSignIn} onChangeForm={handleChangeForm} />
                )}
                {currentForm === 'signUp' && (
                    <SignUpForm onSignUp={handleSignUp} onChangeForm={handleChangeForm} />
                )}
            </Card>
        </Container>
    )
}

export default AuthPage
