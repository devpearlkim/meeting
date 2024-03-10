import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  getPostDetail,
  addLike,
  deleteLike,
  deletePost,
} from '../services/apiPost'
import { getMeetingParicipants } from '../services/apiParticipant'
import { useEffect, useState } from 'react'
import ParticipantModal from '../features/meetings/ParticipantModal.js'
import toast from 'react-hot-toast'

const postDetail = () => {
  console.log('상세페이지')
  const navigate = useNavigate()
  const { postId } = useParams()
  const [showOptions, setShowOptions] = useState(false)
  const [isLogin, setIsLogin] = useState(
    sessionStorage.getItem('token') ? true : false,
  )

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

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  const [showParticipantModal, setShowParticipantModal] = useState(false)

  const handleParticipantClick = async () => {
    if (!isLogin) {
      navigate('/login')
      return
    }

    const loggedInUserId = userInfo?.userId
    const hostUserId = data?.data.host.userId
    const participants = data?.data.participants
    const meetingParticipants = await getMeetingParicipants(data.data.meetingId)
    console.log('신청자 목록')
    console.log(meetingParticipants)
    getMeetingParicipants?.data?.some((participant) =>
      console.log(participant.userid),
    )
    console.log('로그인id', loggedInUserId)

    if (
      loggedInUserId === hostUserId ||
      participants.some((participant) => participant?.userid === loggedInUserId)
    ) {
      toast.error('이미 참여중인 모임입니다')
      return
    }

    console.log('participants.data', meetingParticipants?.data)
    console.log(Array.isArray(meetingParticipants?.data))
    if (
      Array.isArray(meetingParticipants?.data) &&
      meetingParticipants?.data.some(
        (participant) =>
          participant.status === 'pending' &&
          participant.userid === loggedInUserId,
      )
    ) {
      toast.error('이미 신청한 모임입니다')
      return
    }
    setShowParticipantModal(true)
  }

  const members = [
    {
      nickname: 'Christy',
      profileImage:
        'https://unsplash.com/photos/oh0DITWoHi4/download?force=true&w=640',
    },
    {
      nickname: 'David',
      profileImage:
        'https://unsplash.com/photos/7Zb7kUyQg1E/download?force=true&w=640',
    },
    {
      nickname: 'Nancy',
      profileImage:
        'https://unsplash.com/photos/F_-0BxGuVvo/download?force=true&w=640',
    },
    {
      nickname: 'Stella',
      profileImage:
        'https://unsplash.com/photos/3TLl_97HNJo/download?force=true&w=640',
    },
    {
      name: 'Mary',
      profileImage:
        'https://unsplash.com/photos/1AhGNGKuhR0/download?force=true&w=640',
    },
  ]

  return (
    <div className="mx-auto flex max-w-screen-lg flex-col overflow-hidden bg-yellow-300 py-4">
      {data?.data && (
        <>
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

              <button onClick={handleParticipantClick}>참가신청</button>

              {showParticipantModal && (
                <ParticipantModal
                  showParticipantModal={showParticipantModal}
                  setShowParticipantModal={setShowParticipantModal}
                  meetingId={data?.data.meetingId}
                />
              )}
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
              <Link to={`/?location=${encodeURIComponent(data.data.location)}`}>
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
              <div className="bg-gray-100">
                <div className="mx-auto my-10 max-w-sm">
                  <div className="overflow-hidden rounded-lg bg-white shadow-lg">
                    <ul className="divide-y divide-gray-200">
                      {members.map((member, index) => (
                        <li
                          key={index}
                          className="user-card flex items-center justify-between p-3"
                        >
                          <div className="flex items-center">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={member.profileImage}
                              alt={member.nickname}
                            />
                            <span className="ml-3 font-medium">
                              {member.nickname}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default postDetail
