import { useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = ({ path, userId }) => {
  const listStyle = 'p-3 text-slate-700 font-semibold hover:text-blue-300'
  const loginedId = JSON.parse(sessionStorage.getItem('userInfo'))?.userId
  const [isMyProfile, setIsMyProfile] = useState(
    loginedId == userId ? true : false,
  )

  let sidebarItems = isMyProfile
    ? [
        {
          path: `/profile/${loginedId}`,
          text: '모임정보',
        },
        {
          path: `/applies/${loginedId}`,
          text: '신청내역',
        },
        {
          path: `/bookmark/${loginedId}`,
          text: '북마크',
        },
      ]
    : [{ path: `/profile/${userId}`, text: '모임정보' }]

  return (
    <div className="">
      <ul className="flex w-full justify-around border border-slate-200">
        {sidebarItems.map((item, idx) => (
          <li
            key={idx}
            className={
              path === item.path ? 'p-3 font-semibold text-cyan-500' : listStyle
            }
          >
            <Link to={item.path}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
