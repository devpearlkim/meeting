import Tab from '../features/myPage/Tab'
import { Outlet, useLocation } from 'react-router-dom'

const MyProfile = () => {
  const { pathname } = useLocation()

  return (
    <div className="flex justify-center">
      <Tab path={pathname} />
      <div className="flex w-4/5">
        <Outlet />
      </div>
    </div>
  )
}

export default MyProfile
