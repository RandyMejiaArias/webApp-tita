import { Navigate, Route, Routes } from "react-router-dom"
import { DashboardPage } from "../pages/DashboardPage"
import { UsersPage } from "../pages/UsersPage"
import { AccountPage } from "../pages/AccountPage"

export const NextSnkrRouter = () => {
  return (
    <Routes>
      <Route path='/' element={ <DashboardPage /> }/>
      <Route path='/account' element={ <AccountPage /> }/>
      <Route path='/users' element={ <UsersPage /> }/>
      <Route path='/*' element={ <Navigate to='/' /> }/>
    </Routes>
  )
}