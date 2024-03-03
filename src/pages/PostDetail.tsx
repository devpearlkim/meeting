import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getPostDetail } from '../services/apiPost.js'
import { useState } from 'react'

const PostDetail = () => {
  const navigate = useNavigate()
  const { postId } = useParams()

  const {
    isLoading,
    error,
    data: postDetail,
  } = useQuery<any>({
    queryKey: ['postDetail', postId],
    queryFn: getPostDetail,
  })

  const [isLiked, setIsLiked] = useState(postDetail?.isLiked)

  const deleteLike = () => {
    // apiDeleteLike호출
    setIsLiked(false)
  }

  const addLike = () => {
    // apiAddLike호출
    setIsLiked(true)
  }

  const handleCategoryClick = (categoryId) => {
    navigate(`/list?category=${categoryId}`)
  }

  return (
    <div className="mx-auto flex max-w-screen-lg flex-col overflow-hidden bg-yellow-300 py-4">
      {postDetail && (
        <>
          {/* 디테일페이지 헤더부분 */}
          <div className="flex gap-4 sm:flex-col md:flex-row lg:flex-row">
            <div className="md:w-1/2">
              <img
                className="h-80 w-full rounded object-cover"
                src={postDetail.image}
                alt="메인이미지"
              />
            </div>
            <div className="flex flex-col gap-2 md:w-1/2">
              <button onClick={isLiked ? deleteLike : addLike}>
                {isLiked ? '꽉찬하트' : '빈하트'}
              </button>
              <h2 className="text-4xl font-bold">{postDetail.title}</h2>
              <Link
                to={`/list?location=${encodeURIComponent(postDetail.location)}`}
              >
                <span>{postDetail.location}</span>
              </Link>
              {console.log(postDetail)}
              {/* <Link to={`/profile/${postDetail.host.userId}`}>
                <div className="flex gap-2">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={postDetail.host.profileImage}
                    alt="프로필이미지"
                  />
                  <span className="block text-sm font-semibold text-slate-400">
                    {postDetail.host.username}
                  </span>
                </div>
              </Link> */}
              <div>{postDetail.created_at}</div>
              <div>{postDetail.meeting_date}</div>
              <div>
                {postDetail.participants_number}/{postDetail.member_limit}
              </div>
            </div>
          </div>

          {/* 디테일페이지 바디부분 */}
          <div className="flex gap-2 sm:flex-col md:flex-row lg:flex-row">
            <div className="md:w-1/2">
              <div className="flex flex-wrap gap-2">
                {postDetail.categories.map((category) => (
                  <button
                    key={category.categoryId}
                    onClick={() => handleCategoryClick(category.categoryId)}
                    className="my-2 inline-block flex-shrink-0 rounded-full bg-blue-500 px-3 py-2 text-sm text-white"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              <div>{postDetail.description}</div>
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

export default PostDetail
