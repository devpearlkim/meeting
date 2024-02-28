import { useForm } from 'react-hook-form'
import { login } from '../../services/apiAuth.js'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import KakaoLogin from './KakaoLogin.jsx'

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
      navigate('/list')
    } catch (error) {
      toast.error('이메일/비밀번호가 올바르지 않습니다')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={'mx-auto w-[20rem] space-y-2 text-slate-950'}
    >
      <KakaoLogin />
      <div className="flex flex-col">
        <input
          type="text"
          id="email"
          placeholder="이메일"
          className={`${
            errors?.email
              ? 'w-full rounded-md border border-red-400 p-2 px-4 py-4 text-sm outline-none ring-red-300 focus:ring-2 disabled:border-red-300 disabled:bg-red-50'
              : 'py-4text-sm w-full rounded-md border border-slate-300 p-2 px-4 py-4 outline-none ring-blue-400 focus:ring-2 disabled:border-slate-500 disabled:bg-slate-300'
          }`}
          {...register('email', { required: '필수 입력사항 입니다' })}
        />
      </div>
      <div className="flex flex-col">
        <input
          type="password"
          id="password"
          placeholder="비밀번호"
          className={`${
            errors?.password
              ? 'w-full rounded-md border border-red-400 p-2 px-4 py-4 text-sm outline-none ring-red-300 focus:ring-2 disabled:border-red-300 disabled:bg-red-50'
              : 'w-full rounded-md border border-slate-300 p-2 px-4 py-4 text-sm outline-none ring-blue-400 focus:ring-2 disabled:border-slate-500 disabled:bg-slate-300'
          }`}
          {...register('password', { required: '필수 입력사항 입니다' })}
        />
      </div>
      <button
        type="submit"
        className="w-full rounded bg-purple-300 px-2 py-3 font-bold text-white outline-none hover:bg-purple-400 active:bg-purple-500 disabled:bg-slate-100 disabled:text-slate-400"
      >
        로그인
      </button>
    </form>
  )
}

export default LoginForm
