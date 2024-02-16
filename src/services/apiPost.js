import axios from 'axios'

export async function getPost({ queryKey, pageParam }) {
  try {
    const response = await axios.get(
      `http://jsonplaceholder.typicode.com/photos?_start=${pageParam}&_limit=15`,
    )
    return response.data
  } catch (error) {
    throw new Error('게시글 불러오는 중 오류발생')
  }
}

export async function addPost() {}
