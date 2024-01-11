import { Route, Routes } from 'react-router-dom'
import AuthGuard from './utils/utilsAuthGuard'
import PrivateRoute from './routes/PrivateRoute'
import AuthRoute from './routes/AuthRoute'
import './styles/modalFromReactBootstrap.scss'
import { Website } from './pages'

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
         <Route path='/page/:id' element={<Website />} />
      </Routes>
   )
}

export default App
