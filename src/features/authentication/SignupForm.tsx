import { useForm } from 'react-hook-form'

const SignupForm = () => {
  const { register, formState, getValues, handleSubmit, trigger } = useForm({
    mode: 'onBlur',
  })
  const { errors } = formState
  const onSubmit = (data) => {
    console.log(data)
  }

  const onChangeEmail = () => {
    trigger('email') // Trigger validation for the email field onChange
  }

  const checkDuplicate = async (value) => {
    console.log(value)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let random = Math.random()
        if (random > 0.5) {
          resolve(false)
        } else {
          resolve(true)
        }
      }, 10)
    })
  }

  const sendVerificationEmail = () => {
    console.log('이메일인증하기 버튼 클릭됨')
  }

  const onError = (errors, e) => console.error(errors, e)

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className={
        'mx-auto w-2/3 space-y-6 rounded-md border-2 border-purple-600 bg-white p-4 text-purple-950 shadow-md'
      }
    >
      <label
        htmlFor="email"
        className={`${
          errors?.email
            ? 'block text-sm font-semibold text-red-700'
            : 'block text-sm font-semibold'
        }`}
      >
        이메일
      </label>
      <input
        type="text"
        id="email"
        {...register('email', {
          required: '필수 입력 항목입니다.',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: '이메일 형식으로 입력해 주세요',
          },
          onChange: () => {
            trigger('email')
          },
        })}
        className={`${
          errors?.email
            ? 'block w-full rounded-md border-2 border-red-400 p-2 outline-none ring-red-300 focus:border-red-500 focus:ring-2 disabled:border-red-300 disabled:bg-red-50'
            : 'block w-full rounded-md border-2 border-purple-400 p-2 outline-none ring-purple-300 focus:border-purple-500 focus:ring-2 disabled:border-purple-300 disabled:bg-purple-50'
        }`}
      ></input>
      {<p className="block text-xs text-red-400">{errors?.email?.message}</p>}

      <label
        htmlFor="password"
        className={`${
          errors?.password
            ? 'block text-sm font-semibold text-red-700'
            : 'block text-sm font-semibold'
        }`}
      >
        비밀번호
      </label>
      <span className="block text-xs text-slate-600">
        영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
      </span>
      <input
        type="password"
        id="password"
        {...register('password', {
          required: '필수 입력 항목입니다.',
          pattern: {
            value:
              /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message: '비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.',
          },
        })}
        className={`${
          errors?.password
            ? 'block w-full rounded-md border-2 border-red-400 p-2 outline-none ring-red-300 focus:border-red-500 focus:ring-2 disabled:border-red-300 disabled:bg-red-50'
            : 'block w-full rounded-md border-2 border-purple-400 p-2 outline-none ring-purple-300 focus:border-purple-500 focus:ring-2 disabled:border-purple-300 disabled:bg-purple-50'
        }`}
      ></input>
      {
        <p className="block text-xs text-red-400">
          {errors?.password?.message}
        </p>
      }

      <label
        htmlFor="passwordConfirm"
        className={`${
          errors?.passwordConfirm
            ? 'block text-sm font-semibold text-red-700'
            : 'block text-sm font-semibold'
        }`}
      >
        비밀번호 확인
      </label>
      <input
        type="password"
        id="passwordConfirm"
        {...register('passwordConfirm', {
          required: '필수 입력 항목입니다.',
          validate: (value) =>
            value === getValues().password || '비밀번호와 일치하지 않습니다',
        })}
        className={`${
          errors?.passwordConfirm
            ? 'block w-full rounded-md border-2 border-red-400 p-2 outline-none ring-red-300 focus:border-red-500 focus:ring-2 disabled:border-red-300 disabled:bg-red-50'
            : 'block w-full rounded-md border-2 border-purple-400 p-2 outline-none ring-purple-300 focus:border-purple-500 focus:ring-2 disabled:border-purple-300 disabled:bg-purple-50'
        }`}
      ></input>
      {
        <p className="block text-xs text-red-400">
          {errors?.passwordConfirm?.message}
        </p>
      }

      <label
        htmlFor="nickName"
        className={`${
          errors?.nickName
            ? 'block text-sm font-semibold text-red-700'
            : 'block text-sm font-semibold'
        }`}
      >
        닉네임
      </label>
      <span className="block text-xs text-slate-600">
        다른 유저와 겹치지 않도록 입력해주세요(2~20자)
      </span>
      <input
        type="text"
        id="nickName"
        {...register('nickName', {
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
            const isDuplicated = await checkDuplicate(value)
            return !isDuplicated || '다른 사용자가 사용중인 닉네임입니다'
          },
        })}
        className={`${
          errors?.nickName
            ? 'block w-full rounded-md border-2 border-red-400 p-2 outline-none ring-red-300 focus:border-red-500 focus:ring-2 disabled:border-red-300 disabled:bg-red-50'
            : 'block w-full rounded-md border-2 border-purple-400 p-2 outline-none ring-purple-300 focus:border-purple-500 focus:ring-2 disabled:border-purple-300 disabled:bg-purple-50'
        }`}
      ></input>
      {
        <p className="block text-xs text-red-400">
          {errors?.nickName?.message}
        </p>
      }

      <button type="submit">제출</button>
    </form>
  )
}

export default SignupForm
