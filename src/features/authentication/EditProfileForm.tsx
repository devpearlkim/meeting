import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  signup,
  checkNickname,
  sendCode,
  checkCode,
} from '../../services/apiAuth.js'
import { useNavigate } from 'react-router-dom'
import ImageUpload from '../meetings/ImageUpload.js'
import CategoryInput from '../meetings/CategoryInput.js'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from '../../services/apiUser'

const EditProfileForm = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['myInfo'],
    queryFn: getProfile,
  })

  console.log('수정전 유저정보', data)
  const formItems = useForm({
    mode: 'onBlur',
    defaultValues: {
      nickname: data?.nickname,
      username: data?.username,
      password: '',
      passwordConfirm: '',
      gender: data?.gender,
    },
  })

  useEffect(() => {
    if (data) {
      formItems.reset({
        nickname: data.nickname,
        username: data.username,
        password: '',
        passwordConfirm: '',
        gender: data.gender,
      })
    }
  }, [data])

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
    console.log('개인정보 수정버튼 클릭')
    console.log('formData', data)
    // try {
    // const resonse = await editProfile(formData)
    // navigate(`/profile/${userId}`)
    // } catch (err) {
    // console.error('개인정보 수정중 에러 발생->에러바운더리')
    // }
  }

  const checkDuplicate = async (nickname) => {
    const response = await checkNickname({ nickname })
    const isUsable = response.data
    return isUsable
  }

  const onError = (errors, e) => console.error(errors, e)

  return (
    <div>
      {data && (
        <FormProvider {...formItems}>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className={'mx-auto w-[20rem] space-y-6 text-slate-950'}
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className={`${
                  errors?.password
                    ? 'mb-1 block text-sm font-semibold text-red-700'
                    : 'mb-1 block text-sm font-semibold'
                }`}
              >
                비밀번호 재설정
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
            <div className="pb-40">
              <label
                htmlFor="image"
                className="mb-1 block text-sm font-semibold"
              >
                프로필 이미지
              </label>
              <ImageUpload type={'profile'} />
            </div>
            <input
              {...register('provider', { value: 'local' })}
              type="hidden"
            />
            <div>
              <label
                htmlFor="category"
                className="mb-1 block text-sm font-semibold"
              >
                카테고리
              </label>
              <CategoryInput
                mode={'signup'}
                default_categories={data?.categories}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded bg-purple-300 px-2 py-3 font-bold text-white outline-none hover:bg-purple-400 active:bg-purple-500 disabled:bg-slate-100 disabled:text-slate-400"
            >
              회원가입하기
            </button>
          </form>
        </FormProvider>
      )}
    </div>
  )
}

export default EditProfileForm
