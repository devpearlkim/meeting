import { Link } from 'react-router-dom'

const Sidebar = ({ path, userId }) => {
  const listStyle = 'p-3 text-slate-700 font-semibold hover:text-blue-300'

  const sidebarItems = [
    { path: `/profile/${userId}`, text: '모임정보' },
    { path: '/applies', text: '신청내역' },
    { path: '/bookmark', text: '북마크' },
  ]

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
