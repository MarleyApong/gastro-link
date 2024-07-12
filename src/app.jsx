import { Route, Routes, useNavigate } from 'react-router-dom'
import AuthGuard from './guard/AuthGuard'
import PrivateRouter from './routers/PrivateRouter'
import AuthRouter from './routers/AuthRouter'
import './styles/modalFromReactBootstrap.scss'
import PublicRouter from './routers/PublicRouter'

const App = () => {
   const Navigate = useNavigate()
   
   return (
      <Routes>
         <Route path="/auth/*" element={<AuthRouter />} />
         <Route path='/page/*' element={<PublicRouter />} />
         <Route path="/*" element={
            <AuthGuard>
               <PrivateRouter />
            </AuthGuard>
         }
         />
         <Route
            path="*"
            element={<Navigate to="/auth/login" />}
         />
      </Routes>
   )
}

export default App
