import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  getPostDetail,
  addLike,
  deleteLike,
  deletePost,
} from '../services/apiPost.js'
import { useEffect, useState } from 'react'
import ParticipantModal from '../features/meetings/ParticipantModal.jsx'
import ReceivedApplicationsList from '../features/myPage/ReceivedApplicationsList.jsx'
import { FaHeart } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { MdDateRange, MdPerson } from 'react-icons/md'
import dayjs from 'dayjs'
import defaultImage from '../assets/images/defaultImage.jpg'
import defaultProfileImage from '../assets/images/defaultProfileImage.png'
import ErrorBoundary from '../features/error/ErrorBoundary.jsx'

const postDetail = () => {
  const navigate = useNavigate()
  const { postId } = useParams()
  const [isLogin, setIsLogin] = useState(
    sessionStorage.getItem('token') ? true : false,
  )

  const { isLoading, error, data } =
    useQuery <
    any >
    {
      queryKey: ['postDetail', postId],
      queryFn: getPostDetail,
    }

  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  const showButton = userInfo?.userId === data?.data?.host.userId

  const handleEditClick = () => {
    navigate('/write', {
      state: { postData: data.data },
    })
  }

  const handleDeleteClick = () => {
    deletePost(postId)
  }

  const [isLiked, setIsLiked] = useState(data?.data.isLiked)

  useEffect(() => {
    setIsLiked(data?.data.isLiked)
  }, [data?.data.isLiked])

  const deleteLikeAPI = () => {
    !isLogin && navigate('/login')
    deleteLike(postId)
    setIsLiked(false)
  }

  const addLikeAPI = () => {
    !isLogin && navigate('/login')
    addLike(postId)
    setIsLiked(true)
  }

  const handleCategoryClick = (categoryId) => {
    navigate(`/?category=${categoryId}`)
  }
  const [showParticipantModal, setShowParticipantModal] = useState(false)
  const loggedInUserId = userInfo?.userId
  const hostUserId = data?.data.host.userId

  useEffect(() => {
    !userInfo && navigate('/login')
  }, [userInfo])

  const handleParticipantClick = async () => {
    if (!isLogin) {
      navigate('/login')
      return
    }
    setShowParticipantModal(true)
  }

  return (
    <div className="mx-auto flex max-w-screen-lg flex-col overflow-hidden py-4">
      {data?.data && (
        <>
          <div className="flex gap-4 sm:flex-col md:flex-row lg:flex-row">
            <div className="md:w-1/2">
              <img
                className="h-80 w-full rounded object-cover"
                src={data.data.image || defaultImage}
                alt="메인이미지"
                onError={(e) => {
                  e.target.src = defaultImage
                }}
              />
            </div>
            <div className="flex flex-col gap-2 md:w-1/2">
              <div className="flex justify-between pr-4">
                <h2 className="text-4xl font-bold ">{data.data.title}</h2>
                <div className="flex gap-2 px-4">
                  <button onClick={isLiked ? deleteLikeAPI : addLikeAPI}>
                    {isLiked ? (
                      <FaHeart className="text-red-500" size={30} />
                    ) : (
                      <FaHeart className="text-neutral-500" size={30} />
                    )}
                  </button>
                  <div className="pt-2">
                    {showButton && (
                      <div className="flex gap-2">
                        <button
                          onClick={handleEditClick}
                          className="text-neutral-500"
                        >
                          수정
                        </button>
                        <button
                          onClick={handleDeleteClick}
                          className="text-neutral-500"
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Link to={`/?location=${encodeURIComponent(data.data.location)}`}>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-neutral-500">
                    장소
                  </span>
                  <div>
                    <FaLocationDot className="inline text-neutral-500" />
                    <span className="mx-1">{data.data.location}</span>
                  </div>
                </div>
              </Link>
              <Link to={`/profile/${data.data.host.userId}`}>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-neutral-500">
                    개최자
                  </span>
                  <div>
                    <div className="flex gap-2">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={data.data.host.profileimage || defaultProfileImage}
                        alt="프로필이미지"
                        onError={(e) => {
                          e.target.src = defaultProfileImage
                        }}
                      />
                      <span className="block text-sm font-semibold text-neutral-500">
                        {data.data.host.username}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-neutral-500">
                  작성일
                </span>
                <div>
                  <MdDateRange className="inline text-neutral-500" />
                  <span className="px-1 text-neutral-500">
                    {dayjs(data.data.created_at).format('YYYY-MM-DD')}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-neutral-500">
                  모임날짜
                </span>
                <div>
                  <MdDateRange className="inline text-neutral-500" />
                  <span className="px-1 text-neutral-500">
                    {data.data.meeting_date}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-neutral-500">
                  모집인원
                </span>
                <div>
                  <MdPerson className="inline text-neutral-500" />
                  <span className="px-1 text-neutral-500">
                    {data.data.participants_number}/{data.data.member_limit}
                  </span>
                </div>
              </div>
              <div className="">
                <button
                  onClick={handleParticipantClick}
                  className="w-full rounded bg-cyan-400 px-2 py-3 font-bold text-white outline-none hover:bg-cyan-400 active:bg-cyan-500 disabled:bg-slate-100 disabled:text-slate-400"
                >
                  참가신청
                </button>
              </div>
              {showParticipantModal && (
                <ParticipantModal
                  showParticipantModal={showParticipantModal}
                  setShowParticipantModal={setShowParticipantModal}
                  meetingId={data?.data.meetingId}
                />
              )}
            </div>
          </div>
          {loggedInUserId === hostUserId && (
            <ReceivedApplicationsList meetingId={data.data.meetingId} />
          )}
          <div className="my-4 flex gap-4 sm:flex-col md:flex-row lg:flex-row">
            <div className="md:w-1/2">
              <div className="flex flex-wrap gap-2">
                {data.data?.categories.map((category) => (
                  <button
                    key={category.categoryId}
                    onClick={() => handleCategoryClick(category.categoryId)}
                    className="my-2 inline-block flex-shrink-0 rounded-full bg-cyan-400 px-3 py-2 text-sm text-white"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              <div>{data.data.description}</div>
            </div>
            <div className="md:w-1/2">
              <div className="mr-20 overflow-hidden rounded-lg bg-slate-200 shadow-lg">
                <ul className="divide-y divide-gray-200">
                  {data.data.participants.map((member, index) => (
                    <Link to={`/profile/${member.userid}`}>
                      <li
                        key={index}
                        className="user-card flex items-center justify-between p-3 hover:bg-slate-300"
                      >
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={member.profileImage || defaultProfileImage}
                            alt={member.nickname}
                            onError={(e) => {
                              e.target.src = defaultProfileImage
                            }}
                          />
                          <span className="ml-3 font-medium">
                            {member.nickname}
                          </span>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default (
  <ErrorBoundary>
    <postDetail />
  </ErrorBoundary>
)
