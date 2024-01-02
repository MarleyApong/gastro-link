import { Route, Routes } from 'react-router-dom'
import AuthGuard from './utils/AuthGuard'
import PrivateRoute from './routes/Private'
import AuthRoute from './routes/Auth'
import './styles/modalFromReactBootstrap.scss'

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
