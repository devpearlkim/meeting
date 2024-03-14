import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import {
  signup,
  checkNickname,
  sendCode,
  checkCode,
} from '../../services/apiAuth.js'
import { useNavigate } from 'react-router-dom'
import ImageUpload from '../meetings/ImageUpload.js'
import CategoryInput from '../meetings/CategoryInput.js'

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
      console.log('인증코드 확인')
      console.log(response)
    } catch (err) {
      console.log('err')
      console.log(err)
      setError('verificationCode', { type: 'manual', message: err.message })
    } finally {
      setIsSending(false)
    }

    // setIsNotPass(true)
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
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className={`${
              errors?.email
                ? 'mb-1 block text-sm font-semibold text-red-700'
                : 'mb-1 block text-sm font-semibold'
            }`}
          >
            이메일
          </label>
          <input
            type="text"
            id="email"
            disabled={emailChecked}
            placeholder="이메일"
            {...register('email', {
              required: '필수 입력 항목입니다.',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: '이메일 형식으로 입력해 주세요',
              },
              onChange: () => {
                trigger('email')
                showCodeInput && setShowCodeInput(false)
              },
            })}
            className={`${
              errors?.email
                ? 'w-full rounded-md border border-red-400 p-2 px-4 text-sm outline-none ring-red-300 focus:ring-2 disabled:border-red-300 disabled:bg-red-50'
                : 'w-full rounded-md border border-slate-300 p-2 px-4 text-sm outline-none ring-blue-400 focus:ring-2 disabled:border-slate-500 disabled:bg-slate-300'
            }`}
          ></input>
          {
            <p className="my-1 block text-xs text-red-400">
              {errors?.email?.message}
            </p>
          }
          <button
            type="button"
            onClick={() => {
              setIsSending(true)
              const email = getValues().email
              sendVerification(email)
              setValue('verificationCode', '')
            }}
            disabled={
              isSending ||
              errors?.email ||
              !getValues().email ||
              showCodeInput ||
              emailChecked
            }
            className="w-full rounded bg-purple-300 px-2 py-3 font-bold text-white outline-none hover:bg-purple-400 active:bg-purple-500 disabled:bg-slate-100 disabled:text-slate-400"
          >
            {isSending
              ? '로딩스피너'
              : emailChecked
                ? '이메일 인증 완료'
                : '이메일 인증하기'}
          </button>
        </div>

        {showCodeInput && (
          <div>
            <span className="block text-xs text-slate-600">
              {remainingTime >= 0 &&
                `남은 시간: ${formatTime(remainingTime / 1000)}`}
            </span>
            <span className="block text-xs text-slate-600">
              이메일로 전송된 인증코드를 입력해주세요
            </span>
            <input
              type="text"
              id="verificationCode"
              placeholder="인증코드 6자리 입력"
              maxLength={6}
              {...register('verificationCode', {
                required: '필수 입력 항목입니다.',
              })}
              className={`${'w-[20rem]block rounded-md border-2 border-slate-300 p-2 outline-none ring-blue-400 focus:ring-2 disabled:border-slate-500 disabled:bg-slate-300'}`}
            ></input>
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

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className={`${
              errors?.password
                ? 'mb-1 block text-sm font-semibold text-red-700'
                : 'mb-1 block text-sm font-semibold'
            }`}
          >
            비밀번호
          </label>
          <span className="my-1 block text-xs text-slate-600">
            영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
          </span>
          <input
            type="password"
            id="password"
            placeholder="비밀번호"
            {...register('password', {
              required: '필수 입력 항목입니다.',
              pattern: {
                value:
                  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  '비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.',
              },
            })}
            className={`${
              errors?.password
                ? 'w-full rounded-md border border-red-400 p-2 px-4 text-sm outline-none ring-red-300 focus:ring-2 disabled:border-red-300 disabled:bg-red-50'
                : 'w-full rounded-md border border-slate-300 p-2 px-4 text-sm outline-none ring-blue-400 focus:ring-2 disabled:border-slate-500 disabled:bg-slate-300'
            }`}
          ></input>
          {
            <p className="my-1 block text-xs text-red-400">
              {errors?.password?.message}
            </p>
          }
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="passwordConfirm"
            className={`${
              errors?.passwordConfirm
                ? 'mb-1 block text-sm font-semibold text-red-700'
                : 'mb-1 block text-sm font-semibold'
            }`}
          >
            비밀번호 확인
          </label>
          <input
            type="password"
            id="passwordConfirm"
            placeholder="비밀번호 확인"
            {...register('passwordConfirm', {
              required: '필수 입력 항목입니다.',
              validate: (value) =>
                value === getValues().password ||
                '비밀번호와 일치하지 않습니다',
            })}
            className={`${
              errors?.passwordConfirm
                ? 'w-full rounded-md border border-red-400 p-2 px-4 text-sm outline-none ring-red-300 focus:ring-2 disabled:border-red-300 disabled:bg-red-50'
                : 'w-full rounded-md border border-slate-300 p-2 px-4 text-sm outline-none ring-blue-400 focus:ring-2 disabled:border-slate-500 disabled:bg-slate-300'
            }`}
          ></input>
          {
            <p className="my-1 block text-xs text-red-400">
              {errors?.passwordConfirm?.message}
            </p>
          }
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="username"
            className={`${
              errors?.username
                ? 'mb-1 block text-sm font-semibold text-red-700'
                : 'mb-1 block text-sm font-semibold'
            }`}
          >
            이름
          </label>
          <input
            type="text"
            id="username"
            placeholder="이름"
            {...register('username', {
              required: '필수 입력 항목입니다.',
            })}
            className={`${
              errors?.username
                ? 'w-full rounded-md border border-red-400 p-2 px-4 text-sm outline-none ring-red-300 focus:ring-2 disabled:border-red-300 disabled:bg-red-50'
                : 'w-full rounded-md border border-slate-300 p-2 px-4 text-sm outline-none ring-blue-400 focus:ring-2 disabled:border-slate-500 disabled:bg-slate-300'
            }`}
          ></input>
          {
            <p className="my-1 block text-xs text-red-400">
              {errors?.username?.message}
            </p>
          }
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="nickname"
            className={`${
              errors?.nickname
                ? 'mb-1 block text-sm font-semibold text-red-700'
                : 'mb-1 block text-sm font-semibold'
            }`}
          >
            닉네임
          </label>
          <span className="my-1 block text-xs text-slate-600">
            다른 유저와 겹치지 않도록 입력해주세요(2~20자)
          </span>
          <input
            type="text"
            id="nickname"
            placeholder="별명 (2~20자)"
            {...register('nickname', {
              required: '필수 입력 항목입니다.',
              minLength: {
                value: 2,
                message: '2자 이상 입력해주세요.',
              },
              maxLength: {
                value: 20,
                message: '20자 이하로 입력해주세요.',
              },
              validate: async (value) => {
                const isUsable = await checkDuplicate(value)
                return isUsable || '다른 사용자가 사용중인 닉네임입니다'
              },
              onChange: () => clearErrors('nickname'),
            })}
            className={`${
              errors?.nickname
                ? 'w-full rounded-md border border-red-400 p-2 px-4 text-sm outline-none ring-red-300 focus:ring-2 disabled:border-red-300 disabled:bg-red-50'
                : 'w-full rounded-md border border-slate-300 p-2 px-4 text-sm outline-none ring-blue-400 focus:ring-2 disabled:border-slate-500 disabled:bg-slate-300'
            }`}
          ></input>
          {
            <p className="my-1 block text-xs text-red-400">
              {errors?.nickname?.message}
            </p>
          }
        </div>

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
        {/* <div className="pb-40">
          <label htmlFor="image" className="mb-1 block text-sm font-semibold">
            프로필 이미지
          </label>
          <ImageUpload type={'profile'} />
        </div> */}
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

export default SignupForm
