import { Link } from 'react-router-dom'

const sidebarItems = [
  { path: '/profile', text: '모임정보' },
  { path: '/profile/applies', text: '신청내역' },
  { path: '/profile/bookmark', text: '북마크' },
]

const Sidebar = ({ path }: { path: string }) => {
  const listStyle = 'p-3 text-slate-700 font-semibold hover:text-blue-300'

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