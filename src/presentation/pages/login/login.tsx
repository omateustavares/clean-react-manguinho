import React, { useEffect, useState } from 'react'
import {
  FormStatusBase,
  Input,
  LoginHeader,
  Footer
} from '@/presentation/components'
import Styles from './login-styles.scss'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'

type Props = {
  validation: Validation
  authentication: Authentication
};

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    mainError: '',
    passwordError: '',
    emailError: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate(
        'email', state.email
      ),
      passwordError: validation.validate(
        'password', state.password
      )
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setState({ ...state, isLoading: true })
    await authentication.auth({
      email: state.email,
      password: state.password
    })
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite seu senha"
          />

          <button
            data-testid="submit"
            disabled={!!state.emailError || !!state.passwordError}
            className={Styles.submit}
            type="submit"
          >
            Entrar
          </button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatusBase />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
