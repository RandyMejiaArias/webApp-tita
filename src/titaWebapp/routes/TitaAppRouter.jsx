import { Navigate, Route, Routes } from "react-router-dom"
import { UsersPage } from "../pages/UsersPage"
import { AccountPage } from "../pages/AccountPage"
import { Report1View } from "../views/Report1View"
import { Report2View } from "../views/Report2View"
import { Report3View } from "../views/Report3View"
import { Report4View } from "../views/Report4View"
import { Report5View } from "../views/Report5View"
import { Report6View } from "../views/Report6View"

export const TitaAppRouter = () => {
  return (
    <Routes>
      <Route path='/report1' element={ <Report1View /> }/>
      <Route path='/report2' element={ <Report2View /> }/>
      <Route path='/report3' element={ <Report3View /> }/>
      <Route path='/report4' element={ <Report4View /> }/>
      <Route path='/report5' element={ <Report5View /> }/>
      <Route path='/report6' element={ <Report6View /> }/>
      <Route path='/account' element={ <AccountPage /> }/>
      <Route path='/users' element={ <UsersPage /> }/>
      <Route path='/*' element={ <Navigate to='/report1' /> }/>
    </Routes>
  )
}