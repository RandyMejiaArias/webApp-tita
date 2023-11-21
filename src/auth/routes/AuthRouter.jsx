import { Navigate, Route, Routes } from "react-router-dom"
import { ConfirmUserPage, LoginPage, RegisterPage } from "../pages"

export const AuthRouter = () => {
  return (
    <Routes>
      <Route path='confirm/:token' element={<ConfirmUserPage />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  )
}