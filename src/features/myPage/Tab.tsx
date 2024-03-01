import { Link } from 'react-router-dom'

const sidebarItems = [
  { path: '/profile', text: '모임정보' },
  { path: '/profile/applies', text: '신청내역' },
  { path: '/profile/bookmark', text: '북마크' },
]

const Sidebar = ({ path }: { path: string }) => {
  const listStyle = 'p-3 text-slate-700 font-semibold hover:text-primary'

  return (
    <div className="w-100 mr-10 mt-3 flex gap-2">
      <ul className="border border-slate-200">
        {sidebarItems.map((item, idx) => (
          <li
            key={idx}
            className={
              path === item.path ? 'text-primary p-3 font-semibold' : listStyle
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
