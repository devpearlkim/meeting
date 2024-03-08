import axios from 'axios'

export async function getPost({ queryKey, pageParam }) {
  const backendURI = import.meta.env.VITE_BACKEND_URI
  const perPage = import.meta.env.VITE_PER_PAGE
  const { search, minValue, maxValue, location, from, to } = queryKey[1]
  const token = sessionStorage.getItem('token')
  let categoryArr = []
  if (queryKey[2].length) {
    categoryArr = queryKey[2]?.split('%').map((cat) => parseInt(cat))
  }
  const sort = queryKey[3]
  const params = {
    perPage,
    sort,
    cursorId: pageParam,
  }

  if (minValue !== undefined) {
    params.member_min = minValue
  }
  if (maxValue !== undefined) {
    params.member_max = maxValue
  }
  if (search) {
    params.keyword = search
  }
  if (from) {
    params.date_start = from
  }
  if (to) {
    params.date_end = to
  }
  if (categoryArr.length) {
    params.categories = categoryArr
  }
  if (location) {
    params.location = location
  }

  console.log('params는: ', params)
  try {
    const response = await axios.get(
      `${backendURI}/meetings`,
      {
        params,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    console.log('response : ', response.data)
    return response.data
  } catch (error) {
    throw new Error('Error fetching meetings')
  }
}

export async function getPostDetail({ queryKey }) {
  const postId = queryKey[1]
  const backendURI = import.meta.env.VITE_BACKEND_URI
  const token = sessionStorage.getItem('token')

  try {
    const response = await axios.get(`${backendURI}/meetings/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw new Error('글 상세정보 불러오는 중 오류발생')
  }
}

export async function addPost(formData) {
  const backendURI = import.meta.env.VITE_BACKEND_URI
  const categories = formData.categories.map((category) => parseInt(category))
  const token = sessionStorage.getItem('token')

  try {
    const response = await axios.post(
      `${backendURI}/meetings`,
      {
        ...formData,
        categories,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  } catch (error) {
    throw new Error('글 추가하는 중 오류발생')
  }
}

export async function editPost(formData, meetingId) {
  const backendURI = import.meta.env.VITE_BACKEND_URI
  const categories = formData.categories.map((category) => parseInt(category))
  const token = sessionStorage.getItem('token')

  try {
    const response = await axios.patch(
      `${backendURI}/${meetingId}/meetings`,
      {
        ...formData,
        categories,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  } catch (error) {
    throw new Error('글 추가하는 중 오류발생')
  }
}

export async function getCategories() {
  const backendURI = import.meta.env.VITE_BACKEND_URI

  try {
    const response = await axios.get(`${backendURI}/categories`)

    return response.data
  } catch (error) {
    throw new Error('카테고리 목록 가져오는 중 오류발생')
  }
}

export async function addLike(postId) {
  const token = sessionStorage.getItem('token')
  const backendURI = import.meta.env.VITE_BACKEND_URI
  try {
    const response = await axios.post(
      `${backendURI}/meetings/${postId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return response.data
  } catch (error) {
    throw new Error('좋아요 추가 중 오류발생')
  }
}

export async function deleteLike(postId) {
  const token = sessionStorage.getItem('token')
  const backendURI = import.meta.env.VITE_BACKEND_URI

  try {
    const response = await axios.delete(
      `${backendURI}/meetings/${postId}/like`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return response.data
  } catch (error) {
    throw new Error('좋아요 취소 중 오류발생')
  }
}

export async function getJoinedMeetings() {
  const token = sessionStorage.getItem('token')
  const backendURI = import.meta.env.VITE_BACKEND_URI

  try {
    const response = await axios.get(`${backendURI}/users/meetings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log('참여모임', response.data)
    return response.data
  } catch (error) {
    throw new Error('참여중인 모임 가져오는 중 오류발생')
  }
}

export async function getCreatedMeetings() {
  const token = sessionStorage.getItem('token')
  const backendURI = import.meta.env.VITE_BACKEND_URI

  try {
    const response = await axios.get(`${backendURI}/users/meetings-creator`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log('개설모임', response.data)
    return response.data
  } catch (error) {
    throw new Error('참여중인 모임 가져오는 중 오류발생')
  }
}
