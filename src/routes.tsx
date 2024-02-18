import { Route, Routes } from 'react-router-dom'
import AppLayout from './ui/AppLayout'
import Login from './pages/Login'
import NewUsers from './pages/Users'
import Main from './pages/Main'
import List from './pages/List'
import PostDetail from './pages/PostDetail'
import WritePost from './pages/WritePost'

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

        {/* Default route when the path is "/". */}
      </Route>
    </Routes>
  )
}
