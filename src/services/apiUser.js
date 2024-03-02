import axios from 'axios'

export async function getProfile() {
  const backendURI = import.meta.env.VITE_BACKEND_URI
  const token = sessionStorage.getItem('token')

  try {
    const response = await axios.get(`${backendURI}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log('정보조회결과', response.data.data.username)
    console.log('정보조회결과', response.data.data.nickname)
    console.log('정보조회결과', response.data.data.email)
    const userInfo = {
      username: response.data.data.username,
      nickname: response.data.data.nickname,
      email: response.data.data.email,
    }

    sessionStorage.setItem('userInfo', userInfo)

    return null
  } catch (error) {
    throw new Error('유저 정보 조회 중 오류 발생')
  }
}

export default function getInfo() {}
