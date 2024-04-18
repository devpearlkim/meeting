import { useEffect } from 'react'
import SignupForm from '../features/authentication/SignupForm'
import { useNavigate } from 'react-router-dom'

const NewUsers = () => {
  const token = sessionStorage.getItem('token')
  const navigate = useNavigate()
  useEffect(() => {
    token && navigate(-1)
  }, [token])

  return (
    <>
      <SignupForm />
    </>
  )
}

export default NewUsers
