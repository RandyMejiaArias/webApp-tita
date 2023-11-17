import { Navigate, Route, Routes } from "react-router-dom"
import { ViewProducts } from "../views/product/ViewProducts"

export const NextSnkrRouter = () => {
  return (
    <Routes>
      <Route path='/' element={ <ViewProducts /> }/>
      <Route path='/*' element={ <Navigate to='/' /> }/>
    </Routes>
  )
}