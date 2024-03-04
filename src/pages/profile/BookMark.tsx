import { useLocation } from 'react-router-dom'
import Profile from '../../features/myPage/Profile'
import Sidebar from '../../features/myPage/Sidebar'

const BookMark = () => {
  const { pathname } = useLocation()

  return (
    <div className="flex">
      <Profile />
      <div className="mx-10 flex w-full flex-col">
        <Sidebar path={pathname} />
        <div className="flex w-4/5">
          <div>북마크페이지입니다</div>
        </div>
      </div>
    </div>
  )
}

export default BookMark
