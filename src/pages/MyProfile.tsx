import Tab from '../features/myPage/Tab'
import Profile from '../features/myPage/Profile'
import { Outlet, useLocation } from 'react-router-dom'
import path from 'path'

const MyProfile = () => {
  const { pathname } = useLocation()
  console.log('pathname', pathname)

  return (
    <div className="flex">
      <Profile />
      <div className="mx-10 flex w-full flex-col">
        <Tab path={pathname} />
        <div className="flex w-4/5">
          <div>마이프로필</div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
