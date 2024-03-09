import axios from 'axios'

export async function signup(formData) {
  const backendURI = import.meta.env.VITE_BACKEND_URI

  try {
    const response = await axios.post(`${backendURI}/auth/signup`, {
      ...formData,
    })

    if (response.status !== 200) {
      throw new Error('회원가입 과정에서 오류발생')
    }

    return response.data
  } catch (error) {
    throw new Error('회원가입 과정에서 오류발생' + error.message)
  }
}

export async function editProfile(formData) {
  const backendURI = import.meta.env.VITE_BACKEND_URI
  const token = sessionStorage.getItem('token')

  try {
    const response = await axios.patch(
      `${backendURI}/users/profile`,
      {
        ...formData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (response.status !== 200) {
      throw new Error('회원정보 수정 과정에서 오류발생')
    }

    return response.data.data
  } catch (error) {
    throw new Error('회원정보 수정 과정에서 오류발생' + error.message)
  }
}

export async function sendCode({ email, type }) {
  const backendURI = import.meta.env.VITE_BACKEND_URI

  try {
    const response = await axios.post(`${backendURI}/auth/send-code`, {
      email,
      type,
    })

    return response.data
  } catch (error) {
    if (error.response.status === 409) {
      throw new Error('이미 가입된 이메일 입니다')
    }
    throw new Error('이메일로 코드 전송 과정에서 오류 발생: ' + error.message)
  }
}

export async function checkCode({ email, code }) {
  const backendURI = import.meta.env.VITE_BACKEND_URI

  try {
    const response = await axios.get(
      `${backendURI}/auth/auth-code?email=${email}&code=${code}`,
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
  const backendURI = import.meta.env.VITE_BACKEND_URI

  try {
    const response = await axios.get(
      `${backendURI}/users/check-nickname?nickname=${nickname}`,
    )

    if (response.status !== 200) throw new Error('이미 있는 닉네임 입니다')

    return response.data
  } catch (error) {
    throw new Error('이미 있는 닉네임 입니다')
  }
}

export async function login({ email, password }) {
  const backendURI = import.meta.env.VITE_BACKEND_URI

  try {
    const response = await axios.post(`${backendURI}/auth/login`, {
      email,
      password,
    })
    const token = response.headers.get('Authorization')

    if (token) {
      sessionStorage.setItem('token', token.replace("'Bearer ", ''))
    }

    return response.data
  } catch (error) {
    throw new Error('로그인에 실패했습니다')
  }
}

export async function logout() {
  const backendURI = import.meta.env.VITE_BACKEND_URI
  const token = sessionStorage.getItem('token')

  try {
    const response = await axios.post(`${backendURI}/auth/logout`, {
      jwt: token,
    })

    return response.data
  } catch (error) {
    throw new Error('로그아웃에 실패했습니다')
  }
}
