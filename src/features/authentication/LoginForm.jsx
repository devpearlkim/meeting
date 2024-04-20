import { useForm } from 'react-hook-form'
import { login } from '../../services/apiAuth.js'
import { getProfile } from '../../services/apiUser.js'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import KakaoLogin from './KakaoLogin.jsx'
import ErrorBoundary from '../error/ErrorBoundary.jsx'
import Input from '../../ui/Input.jsx'

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
      toast.success('로그인에 성공했습니다.')
      await getProfile()
      navigate(-1)
    } catch (error) {
      toast.error('이메일/비밀번호가 올바르지 않습니다')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={'mx-auto w-[20rem] space-y-3 text-slate-950'}
    >
      <div className="flex flex-col items-center gap-3 border-b-2 py-4">
        <span className="font-sm text-neutral-500">sns간편로그인</span>
        <KakaoLogin />
      </div>
      <Input
        id="email"
        type="text"
        placeholder="이메일"
        register={register}
        error={!!errors.email}
        errorMessage={errors?.email?.message}
        required
      />
      <Input
        id="password"
        type="password"
        placeholder="비밀번호"
        register={register}
        error={!!errors.password}
        errorMessage={errors?.password?.message}
        required
      />
      <button
        type="submit"
        className="w-full rounded bg-purple-300 px-2 py-3 font-bold text-white outline-none hover:bg-purple-400 active:bg-purple-500 disabled:bg-slate-100 disabled:text-slate-400"
      >
        로그인
      </button>
    </form>
  )
}

export default (
  <ErrorBoundary>
    <LoginForm />
  </ErrorBoundary>
)
