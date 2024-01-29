import { Route, Routes } from 'react-router-dom'
import AppLayout from './ui/AppLayout'
import Login from './pages/Login'
import NewUsers from './pages/Users'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Default route when the path is "/". */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<NewUsers />} />
      </Route>
    </Routes>
  )
}
