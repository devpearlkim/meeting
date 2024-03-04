import { useLocation } from 'react-router-dom'
import PostForm from '../features/meetings/PostForm'

const WritePost = () => {
  const location = useLocation()
  const postData = location.state.postData

  return (
    <>
      <p>포스트작성페이지</p>
      <PostForm postData={postData} />
    </>
  )
}

export default WritePost
