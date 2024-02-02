import { Route, Routes } from 'react-router-dom'
import AppLayout from './ui/AppLayout'
import Login from './pages/Login'
import NewUsers from './pages/Users'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="http://localhost:5173/signup" element={<NewUsers />} />
      <Route path="http://localhost:5173/login" element={<Login />} />
      <Route element={<AppLayout />}>
        {/* Default route when the path is "/". */}
      </Route>
    </Routes>
  )
}
