import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import {
  signup,
  checkNickname,
  sendCode,
  checkCode,
} from '../../services/apiAuth.js'
import CategoryInput from '../meetings/CategoryInput.js'
import ErrorBoundary from '../error/ErrorBoundary.jsx'
import Input from '../../ui/Input.jsx'

const SignupForm = () => {
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [emailChecked, setEmailChecked] = useState(false)
  const [remainingTime, setRemainingTime] = useState(null)
  const [timerInterval, setTimerInterval] = useState(null)
  const [isSending, setIsSending] = useState(false)

  const navigate = useNavigate()

  const formItems = useForm({
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

  const {
    register,
    setError,
    formState: { errors },
    getValues,
    handleSubmit,
    trigger,
    setValue,
    clearErrors,
  } = formItems

  const onSubmit = async (data) => {
    const { passwordConfirm, verificationCode, ...formData } = data
    try {
      const resonse = await signup(formData)
      navigate('/login')
    } catch (err) {
      console.error('회원가입 중 에러 발생->에러바운더리')
    }
  }

  const checkDuplicate = async (nickname) => {
    const response = await checkNickname({ nickname })
    const isUsable = response.data
    return isUsable
  }

  const startTimer = (verificationSentTime) => {
    const interval = setInterval(() => {
      const currentTime = dayjs()
      const elapsedTime = currentTime.diff(verificationSentTime, 'milliseconds')
      const remaining = 3 * 60 * 1000 - elapsedTime
      setRemainingTime(Math.max(0, remaining))
      if (remaining <= 0) {
        clearInterval(interval)
      }
    }, 1000)
    setTimerInterval(interval)
  }

  const checkVerification = async ({ code, email }) => {
    try {
      const response = await checkCode({ code, email })
      setShowCodeInput(false)
      setEmailChecked(true)
    } catch (err) {
      setError('verificationCode', { type: 'manual', message: err.message })
    } finally {
      setIsSending(false)
    }
  }

  const sendVerification = async (email) => {
    setError('verificationCode', { message: '' })
    if (timerInterval) clearInterval(timerInterval)
    try {
      const response = await sendCode({ email, type: 'signup' })
      if (response) {
        setShowCodeInput(true)
        const verificationSentTime = dayjs()
        setRemainingTime(3 * 60 * 1000)
        startTimer(verificationSentTime)
      }
    } catch (err) {
      if (err.message === '이미 가입된 이메일 입니다') {
        setError('email', {
          type: 'manual',
          message: '이미 가입된 이메일입니다',
        })
      }
    } finally {
      setIsSending(false)
    }
  }

  const onError = (errors, e) => console.error(errors, e)

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <FormProvider {...formItems}>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className={'mx-auto w-[20rem] space-y-6 text-slate-950'}
      >
        <Input
          id="email"
          type="text"
          placeholder="이메일"
          register={register}
          error={!!errors.email}
          errorMessage={errors?.email?.message}
          required
          pattern={{
            value: /\S+@\S+\.\S+/,
            message: '이메일 형식으로 입력해 주세요',
          }}
          onChange={() => {
            trigger('email')
            showCodeInput && setShowCodeInput(false)
          }}
        />

        {showCodeInput && (
          <div>
            <span className="block text-xs text-slate-600">
              {remainingTime >= 0 &&
                `남은 시간: ${formatTime(remainingTime / 1000)}`}
            </span>
            <span className="block text-xs text-slate-600">
              이메일로 전송된 인증코드를 입력해주세요
            </span>
            <Input
              id="verificationCode"
              type="text"
              placeholder="인증코드 6자리 입력"
              maxLength={6}
              register={register}
              error={!!errors.verificationCode}
              errorMessage={errors?.verificationCode?.message}
              required
            />
            <button
              type="button"
              onClick={() => {
                const code = getValues().verificationCode
                checkVerification({ code, email: getValues().email })
              }}
              disabled={!getValues().verificationCode || remainingTime === 0}
              className="my-2 -ml-16 rounded bg-purple-300 px-2 py-1 text-white outline-none hover:bg-purple-400 active:bg-purple-500 disabled:bg-slate-400"
            >
              확인
            </button>
            {remainingTime > 0 && (
              <p className="my-1 block text-xs text-red-400">
                {errors?.verificationCode?.message}
              </p>
            )}
            {remainingTime === 0 && (
              <p className="my-1 block text-xs text-red-400">
                인증코드가 만료되었습니다.
              </p>
            )}
            <button
              type="button"
              onClick={() => {
                const email = getValues().email
                setValue('verificationCode', '')
                sendVerification(email)
              }}
              className="my-2 rounded bg-purple-300 px-2 py-1 text-xs text-white outline-none hover:bg-purple-400 active:bg-purple-500 disabled:bg-slate-400"
            >
              재전송
            </button>
          </div>
        )}

        <Input
          id="password"
          type="password"
          placeholder="비밀번호"
          register={register}
          error={!!errors.password}
          errorMessage={errors?.password?.message}
          required
          pattern={{
            value:
              /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message: '비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.',
          }}
        />

        <Input
          id="passwordConfirm"
          type="password"
          placeholder="비밀번호 확인"
          register={register}
          error={!!errors.passwordConfirm}
          errorMessage={errors?.passwordConfirm?.message}
          required
          validate={(value) =>
            value === getValues().password || '비밀번호와 일치하지 않습니다'
          }
        />

        <Input
          id="username"
          type="text"
          placeholder="이름"
          register={register}
          error={!!errors.username}
          errorMessage={errors?.username?.message}
          required
        />

        <Input
          id="nickname"
          type="text"
          placeholder="별명 (2~20자)"
          register={register}
          error={!!errors.nickname}
          errorMessage={errors?.nickname?.message}
          required
          minLength={2}
          maxLength={20}
          validate={async (value) => {
            const isUsable = await checkDuplicate(value)
            return isUsable || '다른 사용자가 사용중인 닉네임입니다'
          }}
          onChange={() => clearErrors('nickname')}
        />

        <div className="flex flex-col gap-1.5">
          <label
            className={`${
              errors?.gender
                ? 'mb-1 block text-sm font-semibold text-red-700'
                : 'mb-1 block text-sm font-semibold'
            }`}
          >
            성별
          </label>
          <div className="flex justify-around">
            <label>
              <input
                {...register('gender', { required: true })}
                type="radio"
                value="male"
                className="h-4 w-4 accent-purple-500"
              />
              <span className="ml-2">남자</span>
            </label>
            <label>
              <input
                {...register('gender', { required: true })}
                type="radio"
                value="female"
                className="h-4 w-4 accent-purple-500"
              />
              <span className="ml-2">여자</span>
            </label>
            <label>
              <input
                {...register('gender', { required: true })}
                type="radio"
                value="other"
                className="h-4 w-4 accent-purple-500"
              />
              <span className="ml-2">선택안함</span>
            </label>
          </div>
        </div>
        <input {...register('profileImage', { value: 'null' })} type="hidden" />
        <input {...register('provider', { value: 'local' })} type="hidden" />

        <div>
          <label
            htmlFor="category"
            className="mb-1 block text-sm font-semibold"
          >
            카테고리
          </label>
          <CategoryInput mode={'signup'} />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-purple-300 px-2 py-3 font-bold text-white outline-none hover:bg-purple-400 active:bg-purple-500 disabled:bg-slate-100 disabled:text-slate-400"
        >
          회원가입하기
        </button>
      </form>
    </FormProvider>
  )
}

export default (
  <ErrorBoundary>
    <SignupForm />
  </ErrorBoundary>
)
