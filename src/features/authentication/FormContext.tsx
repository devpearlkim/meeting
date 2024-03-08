import React, { createContext, useContext } from 'react'
import { useForm } from 'react-hook-form'
import SignupForm from './SignupForm'

const FormContext = createContext()

export const FormProvider = ({ children }) => {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      nickname: '',
      username: '',
      password: '',
      passwordConfirm: '',
      verificationCode: '',
      gender: 'other',
      interestCategory: ['default'],
    },
  })

  return <FormContext.Provider value={methods}>{children}</FormContext.Provider>
}

export const useFormContext = () => useContext(FormContext)
