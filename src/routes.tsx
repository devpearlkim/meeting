import { Route, Routes } from 'react-router-dom'
import AppLayout from './ui/AppLayout'
import Login from './pages/Login'
import NewUsers from './pages/Users'
import Main from './pages/Main'
import List from './pages/List'
import PostDetail from './pages/PostDetail'
import WritePost from './pages/WritePost'
// import MyProfile from './pages/MyProfile'
import MyMeetings from './pages/profile/MyMeetings'
import MyApplies from './pages/profile/MyApplies'
import BookMark from './pages/profile/BookMark'
import EditProfile from './pages/profile/EditProfile'

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
        {/* <Route path="/profile" element={<MyProfile />}> */}
        <Route path="/profile/:userId" element={<MyMeetings />} />
        <Route path="/applies/:userId" element={<MyApplies />} />
        <Route path="/bookmark/:userId" element={<BookMark />} />
        <Route path="/editProfile" element={<EditProfile />} />
        {/* </Route> */}
      </Route>
    </Routes>
  )
}
