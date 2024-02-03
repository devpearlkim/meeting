import { useForm } from 'react-hook-form'
import { login } from '../../services/apiAuth.js'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()
  const onSubmit = async (formData) => {
    try {
      await login(formData)
      toast.success('로그인에 성공했습니다')
      navigate('/')
    } catch (error) {
      toast.error('이메일/비밀번호가 올바르지 않습니다')
    }
  }

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/4">
        <div>
          <input
            type="text"
            id="email"
            placeholder="이메일"
            className={`${
              errors?.email
                ? 'disabled:border-red-30 block w-full rounded-sm border-2 border-red-400 p-2 outline-none ring-red-300 focus:border-red-500 focus:ring-2'
                : 'block w-full rounded-sm border-2 border-purple-400 p-2 outline-none ring-purple-300 focus:border-purple-500 focus:ring-2'
            }`}
            {...register('email', { required: '필수 입력사항 입니다' })}
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="비밀번호"
            className={`${
              errors?.password
                ? 'block w-full rounded-sm border-2 border-red-400 p-2 outline-none ring-red-300 focus:border-red-500 focus:ring-2'
                : 'block w-full rounded-sm border-2 border-purple-400 p-2 outline-none ring-purple-300 focus:border-purple-500 focus:ring-2'
            }`}
            {...register('password', { required: '필수 입력사항 입니다' })}
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  )
}

export default LoginForm
