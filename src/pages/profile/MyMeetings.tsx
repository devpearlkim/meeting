import { useLocation, useParams } from 'react-router-dom'
import Profile from '../../features/myPage/Profile'
import Sidebar from '../../features/myPage/Sidebar'
import JoinedMeetings from '../../features/myPage/JoinedMeetings'
import CreatedMeetings from '../../features/myPage/CreatedMeetings'

const MyMeetings = () => {
  const { pathname } = useLocation()
  const { userId } = useParams()

  return (
    <div className="flex">
      <Profile />
      <div className="mx-10 flex w-full flex-col">
        <Sidebar path={pathname} userId={userId} />
        <div className="flex w-4/5">
          <div>모임정보페이지</div>
          <JoinedMeetings />
          <CreatedMeetings />
        </div>
      </div>
    </div>
  )
}

export default MyMeetings
