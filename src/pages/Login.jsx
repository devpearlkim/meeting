import { useEffect } from 'react'
import LoginForm from '../features/authentication/LoginForm'
import { Link, useNavigate } from 'react-router-dom'

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
      <div className="mt-9 flex w-full flex-col items-center justify-center">
        <LoginForm />
        <div className="mt-4 flex justify-between gap-36 text-sm text-neutral-500">
          <button>비밀번호찾기</button>
          <Link to={'/signup'}>
            <button>회원가입</button>
          </Link>
        </div>
      </div>
    )
  }
  return null
}

export default Login
