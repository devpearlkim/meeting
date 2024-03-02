export async function getProfile() {
  const backendURI = import.meta.env.VITE_BACKEND_URI
  const token = sessionStorage.getItem('token')

  try {
    const response = await axios.get(`${backendURI}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log('정보조회결과', response)
    // sessionStorage.setItem('id', data.id)

    return response.data
  } catch (error) {
    throw new Error('유저 정보 조회 중 오류 발생')
  }
}
