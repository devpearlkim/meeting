import { Link, useNavigate } from 'react-router-dom'
import { PiSirenLight } from 'react-icons/pi'
import { useEffect, useState } from 'react'
import { addLike, deleteLike, getPostDetail } from '../../services/apiPost'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { FaHeart } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { MdDateRange, MdPerson } from 'react-icons/md'
import defaultImage from '../../assets/images/defaultImage.jpg'
import defaultProfileImage from '../../assets/images/defaultProfileImage.png'

const Post = ({
  post,
  setShowModal,
  reportedPostId,
  setReportedPostId,
  type,
}) => {
  const navigate = useNavigate()
  const [isLiked, setIsLiked] = useState()
  const [isLogin, setIsLogin] = useState(
    sessionStorage.getItem('token') ? true : false,
  )

  useEffect(() => {
    setIsLiked(post.isLiked)
  }, [post])

  const handleReportClick = () => {
    setReportedPostId(post.meetingId)
    setShowModal(true)
  }

  const queryClient = useQueryClient()

  const deleteLikeAPI = async () => {
    !isLogin && navigate('/login')
    setIsLiked(false)
    await deleteLike(post.meetingId)
    queryClient.invalidateQueries({
      queryKey: ['posts'],
      refetchType: 'all',
    })
  }

  const { data } = useQuery({
    queryKey: ['like', post.meetingId],
    queryFn: getPostDetail,
  })

  useEffect(() => {
    setIsLiked(data?.data.isLiked)
  }, [data])

  const addLikeAPI = async () => {
    !isLogin && navigate('/login')
    setIsLiked(true)
    await addLike(post.meetingId)
    queryClient.invalidateQueries({
      queryKey: ['posts'],
      refetchType: 'all',
    })
  }

  return (
    <div>
      <div className="my-3 flex w-[320px] flex-col overflow-hidden rounded-lg bg-white shadow">
        <Link to={`/detail/${post.meetingId}`} key={post.meetingId}>
          <img
            src={post?.image || defaultImage}
            className="h-52 w-full object-cover"
            alt="메인이미지"
            onError={(e) => {
              e.target.src = defaultImage
            }}
          />
          <div className="flex flex-1 flex-col p-3">
            <div className="flex justify-between">
              {type !== 'checkApply' && (
                <Link to={`/profile/${post?.host?.userId}`}>
                  <div className="flex gap-2">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={post?.host?.profileImage || defaultProfileImage}
                      alt="프로필이미지"
                      onError={(e) => {
                        e.target.src = defaultProfileImage
                      }}
                    />
                    <span className="block text-sm font-semibold text-black">
                      {post?.host?.username}
                    </span>
                  </div>
                </Link>
              )}
              <div className="flex flex-col gap-1">
                <Link to={`/?location=${encodeURIComponent(post.location)}`}>
                  <div className="flex">
                    <FaLocationDot className="text-neutral-500" />
                    <span className="block text-sm text-neutral-500">
                      {post.location}
                    </span>
                  </div>
                </Link>
                <div className="flex">
                  <MdDateRange className="text-neutral-500" />
                  <span className="block text-sm text-neutral-500">
                    {post.meeting_date}
                  </span>
                </div>
              </div>
            </div>

            <h3 className="mb-2 mt-3 text-lg font-bold">{post.title}</h3>

            <div className="my-2">
              <div className="flex justify-between">
                <div className="flex gap-1">
                  {post?.categories?.map((category) => (
                    <button className="inline-block rounded-full bg-cyan-400 px-3 py-1 text-xs text-white">
                      {category.name}
                    </button>
                  ))}
                </div>
                {type !== 'checkApply' && (
                  <div className="flex">
                    <MdPerson className="text-neutral-500" />
                    <span className="block text-sm text-neutral-500">
                      참여인원 {post.participants_number}/{post.member_limit}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
        {type !== 'checkApply' && (
          <div className="mt-auto flex items-center justify-between gap-4 border-slate-300 px-2 py-4">
            <button onClick={isLiked ? deleteLikeAPI : addLikeAPI}>
              {isLiked ? (
                <FaHeart className="text-red-500" size={20} />
              ) : (
                <FaHeart className="text-neutral-500" size={20} />
              )}
            </button>
            <button onClick={handleReportClick}>
              <PiSirenLight className="text-neutral-500" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Post
