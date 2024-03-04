import { Link } from 'react-router-dom'
import { PiSirenLight } from 'react-icons/pi'
import { useState } from 'react'

const Post = ({ post, setShowModal, reportedPostId, setReportedPostId }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked)

  const handleReportClick = () => {
    setReportedPostId(post.id)
    console.log('post안에서의 reportedPostId', reportedPostId)
    setShowModal(true)
  }
  const deleteLike = () => {
    // apiDeleteLike호출
    setIsLiked(false)
  }
  const addLike = () => {
    // apiAddLike호출
    setIsLiked(true)
  }

  return (
    <div>
      <div className="my-3 flex w-[320px] flex-col overflow-hidden rounded-lg bg-white shadow">
        <Link to={`/detail/${post.meetingId}`} key={post.meetingId}>
          <img
            src={post.image}
            className="h-52 w-full object-cover"
            alt="메인이미지"
          />
          <div className="flex flex-1 flex-col p-3">
            <div className="flex justify-between">
              <Link to={`/profile/${post.host.userId}`}>
                <div className="flex gap-2">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={post.profileImage}
                    alt="프로필이미지"
                  />
                  <span className="block text-sm font-semibold text-slate-400">
                    {post.host.username}
                  </span>
                </div>
              </Link>
              <span className="block text-sm font-semibold text-slate-400">
                {post.meeting_date}
              </span>
            </div>
            <h3 className="mb-2 mt-3 text-lg font-bold">{post.title}</h3>
            <div className="my-2">
              <div className="flex justify-between">
                <div className="flex gap-1">
                  {post.categories.map((category) => (
                    <button className="inline-block rounded-full bg-blue-500 px-3 py-1 text-xs text-white">
                      {category.name}
                    </button>
                  ))}
                </div>
                <div>
                  {post.participants_number}/{post.member_limit}
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-slate-300 px-2 pb-2 pt-4">
          <button onClick={isLiked ? deleteLike : addLike}>
            {isLiked ? '꽉찬하트' : '빈하트'}
          </button>
          <button onClick={handleReportClick}>
            <PiSirenLight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Post
