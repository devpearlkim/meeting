import Sidebar from '../features/myPage/Sidebar'
import Profile from '../features/myPage/Profile'
import { Outlet, useLocation, useParams } from 'react-router-dom'

const MyProfile = () => {
  const { pathname } = useLocation()
  const { userId } = useParams()
  console.log('userId')
  console.log(userId)

  return (
    <div className="flex">
      <Profile />
      <div className="mx-10 flex w-full flex-col">
        <Sidebar path={pathname} userId={userId} />
        <div className="flex w-4/5">
          <div>마이프로필</div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
