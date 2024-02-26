import axios from 'axios'

export async function getPost({
  keyword,
  categories,
  minValue,
  maxValue,
  from,
  to,
  location,
  sort,
  perPage,
}) {
  const backendURI = import.meta.env.VITE_BACKEND_URI

  try {
    const response = await axios.get(`${backendURI}/meetings`, {
      params: {
        keyword,
        categories,
        member_min: minValue,
        member_max: maxValue,
        date_start: from,
        date_end: to,
        location,
        sort,
        perPage,
      },
    })
    return response.data
  } catch (error) {
    throw new Error('Error fetching meetings')
  }
}

export async function getPostDetail({ queryKey }) {
  const postId = queryKey[1]
  const backendURI = import.meta.env.VITE_BACKEND_URI

  try {
    const response = await axios.get(`${backendURI}/meetings/${postId}`)
    return response.data
  } catch (error) {
    throw new Error('글 상세정보 불러오는 중 오류발생')
  }
}

export async function addPost(formData) {
  const backendURI = import.meta.env.VITE_BACKEND_URI
  try {
    const response = await axios.post(`${backendURI}/meetings`, {
      ...formData,
    })
    return response.data
  } catch (error) {
    throw new Error('글 추가하는 중 오류발생')
  }
}
