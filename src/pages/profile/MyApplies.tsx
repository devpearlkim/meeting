import { useLocation, useParams } from 'react-router-dom'
import Profile from '../../features/myPage/Profile'
import Sidebar from '../../features/myPage/Sidebar'

const MyApplies = () => {
  const { pathname } = useLocation()
  const { userId } = useParams()

  return (
    <div className="flex">
      <Profile />
      <div className="mx-10 flex w-full flex-col">
        <Sidebar path={pathname} userId={userId} />
        <div className="flex w-4/5">
          <div>모임신청페이지</div>
        </div>
      </div>
    </div>
  )
}

export default MyApplies
