import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './routes/private'
import AuthGuard from './utils/authguard'
import AuthRoute from './routes/auth'

const App = () => {
   return (
      <Routes>
         <Route path="/*" element={
            <AuthGuard>
               <PrivateRoute />
            </AuthGuard>
         }
         />
         <Route path="/auth/*" element={<AuthRoute />} />
      </Routes>
   )
}

export default App
