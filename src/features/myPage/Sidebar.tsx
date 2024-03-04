import { useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = ({ path, userId }) => {
  const listStyle = 'p-3 text-slate-700 font-semibold hover:text-blue-300'
  const [isMyProfile, setIsMyProfile] = useState(
    JSON.parse(sessionStorage.getItem('userInfo'))?.userId === userId
      ? true
      : false,
  )
  let sidebarItems = isMyProfile
    ? [
        {
          path: `/profile/${JSON.parse(sessionStorage.getItem('userInfo')).userId}`,
          text: '모임정보',
        },
        {
          path: `/applies/${JSON.parse(sessionStorage.getItem('userInfo')).userId}`,
          text: '신청내역',
        },
        {
          path: `/bookmark/${JSON.parse(sessionStorage.getItem('userInfo')).userId}`,
          text: '북마크',
        },
      ]
    : [{ path: `/profile/${userId}`, text: '모임정보' }]

  return (
    <div className="">
      <ul className="flex justify-around border border-slate-200">
        {sidebarItems.map((item, idx) => (
          <li
            key={idx}
            className={
              path === item.path ? 'p-3 font-semibold text-blue-500' : listStyle
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
