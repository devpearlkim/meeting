import { Link } from 'react-router-dom'
import { logout } from '../services/apiAuth'

const Header = () => {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  const userId = userInfo?.userId

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="mx-44 flex justify-between px-20 py-4">
      <Link to={'/'}>
        <h1 className="text-2xl font-bold">JW</h1>
      </Link>
      <div className="flex justify-end gap-10">
        <div>
          {userId ? (
            <Link to={`/profile/${userId}`}>
              <button className="mt-2 font-semibold text-neutral-800">
                마이페이지
              </button>
            </Link>
          ) : (
            <Link to={'/login'}>
              <button className="font-semibold text-neutral-800">로그인</button>
            </Link>
          )}
        </div>
        {userId && (
          <button
            className="font-semibold text-neutral-800"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        )}
      </div>
    </div>
  )
}

export default Header
