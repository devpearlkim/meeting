import { Link } from 'react-router-dom'
import { logout } from '../services/apiAuth'

const Header = () => {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  const userId = userInfo?.userId

  const handleLogout = async () => {
    console.log('로그아웃 버튼 클릭')
    await logout()
  }

  return (
    <div className="flex justify-between px-20">
      <Link to={'/'}>
        <div>로고</div>
      </Link>
      <div className="flex justify-end gap-10">
        <div>
          {userId ? (
            <Link to={`/profile/${userId}`}>
              <span>마이페이지아이콘</span>
            </Link>
          ) : (
            <Link to={'/login'}>
              <button>로그인버튼</button>
            </Link>
          )}
        </div>
        {userId && <button onClick={handleLogout}>로그아웃버튼</button>}
      </div>
    </div>
  )
}

export default Header
