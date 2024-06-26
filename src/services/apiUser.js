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

    const userInfo = {
      username: response.data.data.username,
      nickname: response.data.data.nickname,
      email: response.data.data.email,
      userId: response.data.data.userId,
    }

    sessionStorage.setItem('userInfo', JSON.stringify(userInfo))

    return response.data.data
  } catch (error) {
    throw new Error('유저 정보 조회 중 오류 발생')
  }
}

export async function getUserProfile({ queryKey }) {
  const userId = queryKey[1]
  const backendURI = import.meta.env.VITE_BACKEND_URI

  try {
    const response = await axios.get(
      `${backendURI}/users/${userId}/profile-others`,
    )

    return response.data.data
  } catch (error) {
    throw new Error('다른 사용자 프로필 조회 중 오류발생')
  }
}

export async function getAppliedMeetings({ queryKey }) {
  const backendURI = import.meta.env.VITE_BACKEND_URI
  const token = sessionStorage.getItem('token')
  const page = queryKey[1]

  try {
    const response = await axios.get(
      `${backendURI}/users/participants?page=${page}&perPage=6`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return response.data.data
  } catch (error) {
    throw new Error('내가 신청한 모임목록 가져오는 중 오류발생')
  }
}
