import { Navigate, Route, Routes } from "react-router-dom"
import { Dashboard } from "../pages/Dashboard"
import { ScoringCharacteristicPage } from "../pages/ScoringCharacteristicPage"
import { User } from "../pages/User"
import { ViewProducts } from "../views/product/ViewProducts"

export const NextSnkrRouter = () => {
  return (
    <Routes>
      <Route path='/' element={ <Dashboard /> }/>
      <Route path='/scoringCharacteristics' element={ <ScoringCharacteristicPage /> }/>
      <Route path='/products' element={ <ViewProducts /> }/>
      <Route path='/users' element={ <User /> }/>
      <Route path='/*' element={ <Navigate to='/' /> }/>
    </Routes>
  )
}