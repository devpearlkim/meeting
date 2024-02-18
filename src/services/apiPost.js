import axios from 'axios'

export async function getPost({ queryKey, pageParam }) {
  try {
    console.log(queryKey)
    const response = await axios.get(
      `http://jsonplaceholder.typicode.com/photos?_start=${pageParam}&_limit=15`,
    )
    return response.data
  } catch (error) {
    throw new Error('게시글 불러오는 중 오류발생')
  }
}
export async function getPostDetail({ queryKey }) {
  const postId = queryKey[1]
  try {
    const response = await axios.get(
      `http://jsonplaceholder.typicode.com/posts/${postId}`,
    )
    // const response = await axios.get(`${backendURI}/meetings/${postId}`)
    return response.data
  } catch (error) {
    throw new Error('글 상세정보 불러오는 중 오류발생')
  }
}

export async function addPost() {}
