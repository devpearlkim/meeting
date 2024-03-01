import Tab from '../features/myPage/Tab'
import Profile from '../features/myPage/Profile'
import { Outlet, useLocation } from 'react-router-dom'

const MyProfile = () => {
  const { pathname } = useLocation()

  return (
    <div className="flex">
      <Profile />
      <div className="mx-10 flex w-full flex-col">
        <Tab path={pathname} />
        <div className="flex w-4/5">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MyProfile
