import { useEffect } from 'react'
import LoginForm from '../features/authentication/LoginForm'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    if (token) {
      navigate(-1)
    }
  }, [token])

  if (!token) {
    return (
      <div className="flex items-center justify-center">
        <LoginForm />
        <div className="flex justify-between">
          <button>비밀번호찾기</button>
          <button>회원가입</button>
        </div>
      </div>
    )
  }
  return null
}

export default Login
