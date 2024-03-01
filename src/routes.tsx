import { Route, Routes } from 'react-router-dom'
import AppLayout from './ui/AppLayout'
import Login from './pages/Login'
import NewUsers from './pages/Users'
import Main from './pages/Main'
import List from './pages/List'
import PostDetail from './pages/PostDetail'
import WritePost from './pages/WritePost'
import MyProfile from './pages/MyProfile'
import MyMeetings from './pages/myPage/myMeetings'
import MyApplies from './pages/myPage/myApplies'
import BookMark from './pages/myPage/BookMark'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signup" element={<NewUsers />} />
      <Route path="/login" element={<Login />} />
      <Route element={<AppLayout />}>
        <Route path="/list" element={<List />} />
        <Route path="/detail/:postId" element={<PostDetail />} />
        <Route path="/write" element={<WritePost />} />
        <Route path="/profile" element={<MyProfile />}>
          <Route index element={<MyMeetings />} />
          <Route path="/my/applies" element={<MyApplies />} />
          <Route path="/my/bookmark" element={<BookMark />} />
        </Route>
      </Route>
    </Routes>
  )
}
