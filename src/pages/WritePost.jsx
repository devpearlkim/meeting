import { useLocation } from 'react-router-dom'
import PostForm from '../features/meetings/PostForm'
import ErrorBoundary from '../features/error/ErrorBoundary'

const WritePost = () => {
  const location = useLocation()
  const postData = location?.state?.postData

  return (
    <>
      <PostForm postData={postData} />
    </>
  )
}

export default (
  <ErrorBoundary>
    <WritePost />
  </ErrorBoundary>
)
