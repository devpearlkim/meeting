import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route } from 'react-router-dom'
import List from './pages/List.jsx'
import NewUsers from './pages/Users.jsx'
import Login from './pages/Login.jsx'
import PostDetail from './pages/PostDetail.jsx'
import WritePost from './pages/WritePost.jsx'
import BookMark from './pages/profile/BookMark.jsx'
import EditProfile from './pages/profile/EditProfile.jsx'
import MyApplies from './pages/profile/MyApplies.jsx'
import MyMeetings from './pages/profile/MyMeetings.jsx'
import ProtectedRoute from './pages/ProtectedRoute.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<List />} />
      <Route path="/signup" element={<NewUsers />} />
      <Route path="/login" element={<Login />} />
      <Route path="/detail/:postId" element={<PostDetail />} />
      <Route
        path="/write"
        element={
          <ProtectedRoute>
            <WritePost />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:userId"
        element={
          <ProtectedRoute>
            <MyMeetings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/applies/:userId"
        element={
          <ProtectedRoute>
            <MyApplies />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookmark/:userId"
        element={
          <ProtectedRoute>
            <BookMark />
          </ProtectedRoute>
        }
      />
      <Route path="/editProfile" element={<EditProfile />} />
    </Route>,
  ),
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
