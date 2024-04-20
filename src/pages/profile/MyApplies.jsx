import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Profile from '../../features/myPage/Profile'
import Sidebar from '../../features/myPage/Sidebar'
import { useEffect } from 'react'
import AppliedMeetingsList from '../../features/myPage/AppliedMeetingsList'

const MyApplies = () => {
  const { pathname } = useLocation()
  const { userId } = useParams()
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  const navigate = useNavigate()

  useEffect(() => {
    userInfo?.userId !== userId && navigate(`/profile/${userId}`)
  }, [userId])

  return (
    <div className="flex">
      <Profile />
      <div className="mx-10 flex w-full flex-col">
        <Sidebar path={pathname} userId={userId} />
        <div className="flex">
          <AppliedMeetingsList />
        </div>
      </div>
    </div>
  )
}

export default MyApplies
