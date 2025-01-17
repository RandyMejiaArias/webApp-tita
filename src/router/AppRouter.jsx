import { Route, Routes, Navigate } from 'react-router';
import { useCheckAuth } from '../hooks';
import { CheckingAuth } from '../ui/components/CheckingAuth';
import { AuthRouter } from '../auth/routes/AuthRouter';
import { TitaAppRouter } from '../titaWebapp/routes/TitaAppRouter';

export const AppRouter = () => {
  
  const { userStatus } = useCheckAuth();

  if(userStatus === 'checking')
    return <CheckingAuth />;
  return (
    <Routes>
      {
        (userStatus === 'authenticated')
        ? <Route path='/*' element={<TitaAppRouter />}/>
        : <Route path='/auth/*' element={ <AuthRouter />} />
      }
      <Route path='/*' element={ <Navigate to='auth/login' />} />
    </Routes>
  )
}