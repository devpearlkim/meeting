import { Link, useNavigate } from 'react-router-dom'
import { PiSirenLight } from 'react-icons/pi'
import { useEffect, useState } from 'react'
import { addLike, deleteLike } from '../../services/apiPost'
import { QueryCache, useMutation } from '@tanstack/react-query'

const Post = ({ post, setShowModal, reportedPostId, setReportedPostId }) => {
  const navigate = useNavigate()
  const [isLiked, setIsLiked] = useState()
  const [isLogin, setIsLogin] = useState(
    sessionStorage.getItem('token') ? true : false,
  )

  const handleReportClick = () => {
    setReportedPostId(post.meetingId)
    setShowModal(true)
  }

  const [addLikeMutation] = useMutation(addLike, {
    onSuccess: () => {
      QueryCache.invalidateQueries(['posts', searchFormValues, category, sort])
    },
  })

  const [deleteLikeMutation] = useMutation(deleteLike, {
    onSuccess: () => {
      queryCache.invalidateQueries(['posts', searchFormValues, category, sort])
    },
  })

  const handleLikeClick = () => {
    if (!isLogin) {
      navigate('/login')
      return
    }

    if (isLiked) {
      deleteLikeMutation(post.meetingId)
    } else {
      addLikeMutation(post.meetingId)
    }

    setIsLiked(!isLiked)
  }

  return (
    <div>
      <div className="my-3 flex w-[320px] flex-col overflow-hidden rounded-lg bg-white shadow">
        <Link to={`/detail/${post.meetingId}`} key={post.meetingId}>
          <img
            src={post?.image}
            className="h-52 w-full object-cover"
            alt="메인이미지"
          />
          <div className="flex flex-1 flex-col p-3">
            <div className="flex justify-between">
              <Link to={`/profile/${post?.host?.userId}`}>
                <div className="flex gap-2">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={post?.host?.profileImage}
                    alt="프로필이미지"
                  />
                  <span className="block text-sm font-semibold text-slate-400">
                    {post?.host?.username}
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
          <button onClick={handleLikeClick}>
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
