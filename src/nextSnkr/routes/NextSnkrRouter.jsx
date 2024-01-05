import { Navigate, Route, Routes } from "react-router-dom"
import { DashboardPage } from "../pages/DashboardPage"
import { FavoritesPage } from "../pages/FavoritesPage"
import { ScoringCharacteristicPage } from "../pages/ScoringCharacteristicPage"
import { UsersPage } from "../pages/UsersPage"
import { ProductsView } from "../views/product/ProductsView"
import { AccountPage } from "../pages/AccountPage"
import { SingleProductView } from "../views/product/SingleProductView"

export const NextSnkrRouter = () => {
  return (
    <Routes>
      <Route path='/' element={ <DashboardPage /> }/>
      <Route path='/account' element={ <AccountPage /> }/>
      <Route path='/favorites' element={ <FavoritesPage /> }/>
      <Route path='/scoringCharacteristics' element={ <ScoringCharacteristicPage /> }/>
      <Route path='/products' element={ <ProductsView /> }/>
      <Route path='/product/:productId' element={ <SingleProductView /> }/>
      <Route path='/users' element={ <UsersPage /> }/>
      <Route path='/*' element={ <Navigate to='/' /> }/>
    </Routes>
  )
}