import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { checkNickname } from '../../services/apiAuth.js'
import { useNavigate } from 'react-router-dom'
import ImageUpload from '../meetings/ImageUpload.js'
import CategoryInput from '../meetings/CategoryInput.js'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from '../../services/apiUser.js'
import { editProfile } from '../../services/apiAuth.js'
import toast from 'react-hot-toast'
import ErrorBoundary from '../error/ErrorBoundary.jsx'
import Input from '../../ui/Input.jsx'
import Button from '../../ui/Button.jsx'

function EditProfileForm() {
  const { data, isFetching } = useQuery({
    queryKey: ['myInfo'],
    queryFn: getProfile,
  })

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
    formState: { errors },
    getValues,
    handleSubmit,
    clearErrors,
  } = formItems

  const onSubmit = async (data) => {
    const { passwordConfirm, ...formData } = data
    const navigate = useNavigate()

    try {
      await editProfile(formData)
      toast.success('개인정보 수정 완료')
      navigate(`/profile/${data.userId}`)
    } catch (err) {
      toast.error('개인정보 수정 실패')
      console.error('개인정보 수정중 에러 발생->에러바운더리')
    }
  }

  const checkDuplicate = async (nickname) => {
    if (data?.nickname === nickname) {
      return true
    }
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
                message:
                  '비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.',
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
            <div className="pb-40">
              <label
                htmlFor="image"
                className="mb-1 block text-sm font-semibold"
              >
                프로필 이미지
              </label>
              <ImageUpload type={'profile'} />
            </div>
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
            <Button onClick={handleSubmit(onSubmit, onError)} text="수정완료" />
          </form>
        </FormProvider>
      )}
    </div>
  )
}

export default (
  <ErrorBoundary>
    <EditProfileForm />
  </ErrorBoundary>
)
