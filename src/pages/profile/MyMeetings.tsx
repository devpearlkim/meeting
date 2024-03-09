import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Profile from '../../features/myPage/Profile'
import Sidebar from '../../features/myPage/Sidebar'
import JoinedMeetings from '../../features/myPage/JoinedMeetings'
import CreatedMeetings from '../../features/myPage/CreatedMeetings'
import { useEffect } from 'react'

const MyMeetings = () => {
  // MyMeetings페이지는 다른 유저들도 볼 수 있게 하려고 했지만
  // 기획으로 공개, 비공개 여부를 나누는 식으로 하기로 했고 해당 부분은 백과 프론트 다 구현되지 않아 임시로 본인에게만 보이기로 함

  const { pathname } = useLocation()
  const { userId } = useParams()
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  const navigate = useNavigate()

  useEffect(() => {
    userInfo?.userId != userId && navigate(`/`)
  }, [userId])

  return (
    <div className="flex">
      <Profile />
      <div className="mx-10 flex w-full flex-col">
        <Sidebar path={pathname} userId={userId} />
        <div className="flex w-4/5 flex-col gap-4">
          <CreatedMeetings />
          <JoinedMeetings />
        </div>
      </div>
    </div>
  )
}

export default MyMeetings
