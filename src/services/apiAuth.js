import axios from 'axios'

export async function signup(formData) {
  console.log({ ...formData })
  try {
    const response = await axios.post(
      'http://15.164.233.81/api/v1/auth/signup',
      {
        ...formData,
      },
    )

    if (response.status !== 200) {
      throw new Error('회원가입 과정에서 오류발생')
    }

    return response.data
  } catch (error) {
    throw new Error('회원가입 과정에서 오류발생: ' + error.message)
  }
}
export async function sendCode({ email, type }) {
  try {
    const response = await axios.post(
      'http://15.164.233.81/api/v1/auth/send-code',
      {
        email,
        type,
      },
    )

    return response.data
  } catch (error) {
    if (error.response.status === 409) {
      throw new Error('이미 가입된 이메일 입니다')
    }
    throw new Error('이메일로 코드 전송 과정에서 오류 발생: ' + error.message)
  }
}

export async function checkCode({ email, code }) {
  try {
    const response = await axios.get(
      `http://15.164.233.81/api/v1/auth/auth-code?email=${email}&code=${code}`,
    )

    if (response.status !== 200) throw new Error('이미 있는 닉네임 입니다')

    return response.data
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error('올바른 인증 코드가 아닙니다')
    }
    console.error(error.message)
    throw new Error('인증코드 확인 과정에서 오류 발생')
  }
}

export async function checkNickname({ nickname }) {
  try {
    const response = await axios.get(
      `http://15.164.233.81/api/v1/users/check-nickname?nickname=${nickname}`,
    )

    if (response.status !== 200) throw new Error('이미 있는 닉네임 입니다')

    return response.data
  } catch (error) {
    throw new Error('이미 있는 닉네임 입니다')
  }
}

export async function login({ email, password }) {
  try {
    const response = await axios.post(
      'http://15.164.233.81/api/v1/auth/login',
      {
        email,
        password,
      },
      // {
      //   withCredentials: true,
      // },
    )

    return response.data
  } catch (error) {
    throw new Error('로그인에 실패했습니다')
  }
}
