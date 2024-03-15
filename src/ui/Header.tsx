import { Link } from 'react-router-dom'
import { logout } from '../services/apiAuth'

const Header = () => {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  const userId = userInfo?.userId

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="flex justify-between px-20">
      <Link to={'/'}>
        <h1 className="text-xl font-semibold">JW</h1>
      </Link>
      <div className="flex justify-end gap-10">
        <div>
          {userId ? (
            <Link to={`/profile/${userId}`}>
              <span>마이페이지</span>
            </Link>
          ) : (
            <Link to={'/login'}>
              <button>로그인</button>
            </Link>
          )}
        </div>
        {userId && <button onClick={handleLogout}>로그아웃</button>}
      </div>
    </div>
  )
}

export default Header
