import { Route, Routes } from 'react-router-dom'
import AuthGuard from './utils/utilsAuthGuard'
import PrivateRouter from './routers/PrivateRouter'
import AuthRouter from './routers/AuthRouter'
import './styles/modalFromReactBootstrap.scss'
// import PublicRouter from './routers/PublicRouter'

const App = () => {
   return (
      <Routes>
         <Route path="/auth/*" element={<AuthRouter />} />
         {/* <Route path='/page/*' element={<PublicRouter />} /> */}
         <Route path="/*" element={
            <AuthGuard>
               <PrivateRouter />
            </AuthGuard>
         }
         />
      </Routes>
   )
}

export default App
