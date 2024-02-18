import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getPostDetail } from '../services/apiPost.js'

const PostDetail = () => {
  const navigate = useNavigate()
  const { postId } = useParams()

  const {
    isLoading,
    error,
    data: postDetail,
  } = useQuery({ queryKey: ['postDetail', postId], queryFn: getPostDetail })

  const handleCategoryClick = (categoryId) => {
    navigate(`/list?category=${categoryId}`)
  }

  const categories = [
    { id: '1', name: '카테고리 1' },
    { id: '2', name: '카테고리 2' },
    { id: '3', name: '카테고리 3' },
    { id: '11', name: '카테고리 1' },
    { id: '21', name: '카테고리 2' },
    { id: '31', name: '카테고리 3' },
  ]

  return (
    <div className="mx-auto flex max-w-screen-lg flex-col overflow-hidden bg-yellow-300 py-4">
      {postDetail && (
        <>
          {/* 디테일페이지 헤더부분 */}
          <div className="flex gap-4 sm:flex-col md:flex-row lg:flex-row">
            <div className="md:w-1/2">
              <img
                className="h-80 w-full rounded object-cover"
                src="https://loremflickr.com/320/240?random=3"
                alt="메인이미지"
              />
            </div>
            <div className="flex flex-col gap-2 md:w-1/2">
              <h2 className="text-4xl font-bold">{postDetail.title}</h2>
              <Link to={`/list?location=${encodeURIComponent('영국, 런던')}`}>
                <span>런던, 영국</span>
              </Link>
              <div>개최자</div>
              <div>개설일</div>
              <div>모임일</div>
              <div>1/10</div>
            </div>
          </div>

          {/* 디테일페이지 바디부분 */}
          <div className="flex gap-2 sm:flex-col md:flex-row lg:flex-row">
            <div className="md:w-1/2">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className="my-2 inline-block flex-shrink-0 rounded-full bg-blue-500 px-3 py-2 text-sm text-white"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              <div>모임설명모임설명모임설</div>
            </div>
            <div className="md:w-1/2">
              <div> 모임참여멤버들 </div>
            </div>
          </div>
          <div className="bg-slate-700"> 단체채팅 </div>
        </>
      )}
    </div>
  )
}

export default PostDetail
