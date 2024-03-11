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
import ReceivedApplicationsList from '../features/myPage/ReceivedApplicationsList.js'
import { FaHeart } from 'react-icons/fa'
import { IoIosMore } from 'react-icons/io'
import { FaLocationDot } from 'react-icons/fa6'
import { MdDateRange, MdPerson } from 'react-icons/md'
import dayjs from 'dayjs'

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
  const loggedInUserId = userInfo?.userId
  const hostUserId = data?.data.host.userId

  const handleParticipantClick = async () => {
    if (!isLogin) {
      navigate('/login')
      return
    }

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

  return (
    <div className="mx-auto flex max-w-screen-lg flex-col overflow-hidden py-4">
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
              <div className="flex justify-between pr-4">
                <h2 className="text-4xl font-bold">{data.data.title}</h2>
                <div className="flex gap-2 px-4">
                  <button onClick={isLiked ? deleteLikeAPI : addLikeAPI}>
                    {isLiked ? (
                      <FaHeart color="red" size={30} />
                    ) : (
                      <FaHeart color="lightgray" size={30} />
                    )}
                  </button>
                  <div className="pt-2">
                    {showButton && showOptions && (
                      <div className="flex flex-col">
                        <button
                          onClick={handleEditClick}
                          className="rounded bg-purple-300 px-2 py-1 text-white outline-none hover:bg-purple-400"
                        >
                          수정
                        </button>
                        <button
                          onClick={handleDeleteClick}
                          className="rounded bg-purple-300 px-2 py-1 text-white outline-none hover:bg-purple-400"
                        >
                          삭제
                        </button>
                      </div>
                    )}
                    {showButton && !showOptions && (
                      <button onClick={() => setShowOptions(true)}>
                        <IoIosMore size={20} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <Link to={`/?location=${encodeURIComponent(data.data.location)}`}>
                <div className="flex flex-col gap-1 px-4">
                  <span className="text-sm font-semibold">장소</span>
                  <div>
                    <FaLocationDot className="inline" />
                    <span className="mx-1">{data.data.location}</span>
                  </div>
                </div>
              </Link>
              <Link to={`/profile/${data.data.host.userId}`}>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold">개최자</span>
                  <div>
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
                  </div>
                </div>
              </Link>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold">작성일</span>
                <div>
                  <MdDateRange className="inline" />
                  <span className="px-1">
                    {dayjs(data.data.created_at).format('YYYY-MM-DD')}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold">모임날짜</span>
                <div>
                  <MdDateRange className="inline" />
                  <span className="px-1">{data.data.meeting_date}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold">모집인원</span>
                <div>
                  <MdPerson className="inline" />
                  <span className="px-1">
                    {data.data.participants_number}/{data.data.member_limit}
                  </span>
                </div>
              </div>
              <div className="">
                <button
                  onClick={handleParticipantClick}
                  className="w-full rounded bg-purple-300 px-2 py-3 font-bold text-white outline-none hover:bg-purple-400 active:bg-purple-500 disabled:bg-slate-100 disabled:text-slate-400"
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

          {/* 모임에 들어온 신청 목록 */}
          {loggedInUserId === hostUserId && (
            <ReceivedApplicationsList meetingId={data.data.meetingId} />
          )}
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
              <div className="mr-20 overflow-hidden rounded-lg bg-white shadow-lg">
                <ul className="divide-y divide-gray-200">
                  {/* {members.map((member, index) => ( */}
                  {data.data.participants.map((member, index) => (
                    <Link to={`/profile/${member.userid}`}>
                      <li
                        key={index}
                        className="user-card flex items-center justify-between p-3 hover:bg-slate-300"
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

export default postDetail
