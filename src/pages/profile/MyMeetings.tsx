import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Profile from '../../features/myPage/Profile'
import Sidebar from '../../features/myPage/Sidebar'
import JoinedMeetings from '../../features/myPage/JoinedMeetings'
import CreatedMeetings from '../../features/myPage/CreatedMeetings'

const MyMeetings = () => {
  const { pathname } = useLocation()
  const { userId } = useParams()
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

  return (
    <div className="flex">
      <Profile />
      <div className="mx-10 flex w-full flex-col">
        <Sidebar path={pathname} userId={userId} />
        <div className="flex flex-col items-center gap-4">
          {userInfo?.userId == userId ? (
            <>
              <CreatedMeetings />
              <JoinedMeetings />
            </>
          ) : (
            <div>해당 유저는 참여 모임을 비공개 설정했습니다</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyMeetings
