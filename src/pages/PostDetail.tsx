import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getPostDetail, addLike, deleteLike } from '../services/apiPost.js'
import { useState } from 'react'

const postDetail = () => {
  const navigate = useNavigate()
  const { postId } = useParams()
  const [showOptions, setShowOptions] = useState(false)

  const { isLoading, error, data } = useQuery<any>({
    queryKey: ['postDetail', postId],
    queryFn: getPostDetail,
  })

  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  const showButton = userInfo?.userId === data?.data?.host.userId

  const handleEditClick = () => {
    navigate('/write', {
      state: { postData: data.data },
    })
  }

  const handleDeleteClick = () => {
    // 삭제 기능 실행
  }

  const [isLiked, setIsLiked] = useState(data?.data.isLiked)

  const deleteLikeAPI = () => {
    deleteLike(postId)
    setIsLiked(false)
  }

  const addLikeAPI = () => {
    addLike(postId)
    setIsLiked(true)
  }

  const handleCategoryClick = (categoryId) => {
    navigate(`/list?category=${categoryId}`)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="mx-auto flex max-w-screen-lg flex-col overflow-hidden bg-yellow-300 py-4">
      {data?.data && (
        <>
          {/* 디테일페이지 헤더부분 */}
          <div className="flex gap-4 sm:flex-col md:flex-row lg:flex-row">
            <div className="md:w-1/2">
              <img
                className="h-80 w-full rounded object-cover"
                src={data.data.image}
                alt="메인이미지"
              />
            </div>
            <div className="flex flex-col gap-2 md:w-1/2">
              <button onClick={isLiked ? deleteLikeAPI : addLikeAPI}>
                {isLiked ? '꽉찬하트' : '빈하트'}
              </button>
              <div>
                {showButton && showOptions && (
                  <div>
                    <button onClick={handleEditClick}>수정</button>
                    <button onClick={handleDeleteClick}>삭제</button>
                  </div>
                )}
                {showButton && !showOptions && (
                  <button onClick={() => setShowOptions(true)}>...</button>
                )}
              </div>
              <h2 className="text-4xl font-bold">{data.data.title}</h2>
              <Link
                to={`/list?location=${encodeURIComponent(data.data.location)}`}
              >
                <span>{data.data.location}</span>
              </Link>
              <Link to={`/profile/${data.data.host.userId}`}>
                <div className="flex gap-2">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={data.data.host.profileImage}
                    alt="프로필이미지"
                  />
                  <span className="block text-sm font-semibold text-slate-400">
                    {data.data.host.username}
                  </span>
                </div>
              </Link>
              <div>{data.data.created_at}</div>
              <div>{data.data.meeting_date}</div>
              <div>
                {data.data.participants_number}/{data.data.member_limit}
              </div>
            </div>
          </div>

          {/* 디테일페이지 바디부분 */}
          <div className="flex gap-2 sm:flex-col md:flex-row lg:flex-row">
            <div className="md:w-1/2">
              <div className="flex flex-wrap gap-2">
                {data.data?.categories.map((category) => (
                  <button
                    key={category.categoryId}
                    onClick={() => handleCategoryClick(category.categoryId)}
                    className="my-2 inline-block flex-shrink-0 rounded-full bg-blue-500 px-3 py-2 text-sm text-white"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              <div>{data.data.description}</div>
            </div>
            <div className="md:w-1/2">
              <div>모임참여멤버들</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default postDetail
