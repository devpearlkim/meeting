import { useLocation } from 'react-router-dom'
import Profile from '../../features/myPage/Profile'
import Tab from '../../features/myPage/Tab'

const MyApplies = () => {
  const { pathname } = useLocation()

  return (
    <div className="flex">
      <Profile />
      <div className="mx-10 flex w-full flex-col">
        <Tab path={pathname} />
        <div className="flex w-4/5">
          <div>모임신청페이지</div>
        </div>
      </div>
    </div>
  )
}

export default MyApplies
