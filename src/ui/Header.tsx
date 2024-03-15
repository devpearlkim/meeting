import { Link } from 'react-router-dom'
import { logout } from '../services/apiAuth'

const Header = () => {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  const userId = userInfo?.userId

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="mx-44 flex justify-between px-20">
      <Link to={'/'}>
        <h1 className="text-2xl font-bold text-cyan-400">JW</h1>
      </Link>
      <div className="flex justify-end gap-10">
        <div>
          {userId ? (
            <Link to={`/profile/${userId}`}>
              <button className="font-semibold">마이페이지</button>
            </Link>
          ) : (
            <Link to={'/login'}>
              <button className="font-semibold">로그인</button>
            </Link>
          )}
        </div>
        {userId && (
          <button className="font-semibold" onClick={handleLogout}>
            로그아웃
          </button>
        )}
      </div>
    </div>
  )
}

export default Header
