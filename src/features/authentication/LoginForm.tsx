import { useForm } from 'react-hook-form'
import { useState } from 'react'

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = (data) => {
    console.log(data)
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
