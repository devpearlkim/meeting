import { useEffect } from 'react'
import LoginForm from '../features/authentication/LoginForm'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    if (token) {
      // navigate(-1)
    }
  }, [token])

  // if (!token) {
  return (
    <div>
      <LoginForm />
    </div>
  )
  // }
  return null
}

export default Login
