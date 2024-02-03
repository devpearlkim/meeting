import { Route, Routes } from 'react-router-dom'
import AppLayout from './ui/AppLayout'
import Login from './pages/Login'
import NewUsers from './pages/Users'
import Main from './pages/Main'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signup" element={<NewUsers />} />
      <Route path="/login" element={<Login />} />
      <Route element={<AppLayout />}>
        {/* Default route when the path is "/". */}
      </Route>
    </Routes>
  )
}
