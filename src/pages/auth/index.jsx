import React, { useState } from 'react'
import * as RemixIcons from "react-icons/ri"
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import * as Spinners from 'react-loader-spinner'
import { AuthService } from '../../services/authService'
import { Account } from '../../services/accountService'
import logo from '../../assets/img/logo/cs-logo-red.png'
import './login.scss'
import { jwtDecode } from 'jwt-decode'

const Login = () => {
   const navigate = useNavigate()
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [wait, setWait] = useState(true)

   const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
   }

   const showAlert = (title, text) => {
      Swal.fire({
         icon: 'error',
         title: title,
         text: text,
         confirmButtonText: 'Ok'
      })
   }

   const handleLogin = async (e) => {
      e.preventDefault()
      if (email === "" || password === "") {
         showAlert('Erreur', 'Veuillez remplir tous les champs !')
      } else if (!validateEmail(email)) {
         showAlert('Erreur', 'Veuillez entrer une adresse email valide !')
      } else {
         setWait(false)
         try {
            const res = await AuthService.login(email, password)
            if (res.data?.initialPasswordRequired === true) {
               Account.saveInitiatePassword(email, password, 'true')
               navigate('/auth/set-password')
            } else {
               if (res.data?.user?.status?.name !== 'actif') {
                  showAlert('Erreur', 'Accès non autorisé !')
               } else {
                  const token = res.data.token
                  const decoded = jwtDecode(token)
                  const idUser = decoded.id
                  const role = res.data.user.role.id
                  const env = res.data.user.env.id
                  const idStatus = res.data.user.status.id
                  Account.saveToken(token, idUser, role, env, idStatus)
                  navigate("/dashboard")
               }
            }
            setWait(true)
         } catch (err) {
            setWait(true)
            if (err.response) {
               if (err.response.data.status === 500) {
                  showAlert('Erreur', 'Réessayez plus tard !')
               }
               else {
                  showAlert('Erreur', err.response.data.message || "Quelque chose a mal tourné. Oups !")
               }
            } 
            else {
               showAlert('Erreur', "Vérifiez votre connexion !")
            }
         }
      }
   }

   return (
      <div className="Login">
         <div className="Container">
            <div className="Left">
               <h1>Bienvenue sur gastro link</h1>
               <p>Connectez-vous pour continuer</p>
               <span>
                  Copyright &#xa9;gastro link 2024
               </span>
            </div>
            <div className="Right">
               <form onSubmit={handleLogin} method='post' className="Form">
                  <div className="Logo">
                     <img src={logo} alt="" />
                     <span>Gastro <strong>Link</strong></span>
                  </div>
                  <h2>CONNEXION</h2>
                  <div className="InputBox">
                     <div className="Icon">
                        <RemixIcons.RiMailLine size={18} />
                     </div>
                     <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        autoComplete='off'
                     />
                  </div>
                  <div className="InputBox">
                     <div className="Icon">
                        <RemixIcons.RiKeyLine size={18} />
                     </div>
                     <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Mot de passe'
                        autoComplete='off'
                     />
                  </div>
                  <div className="InputBox">
                     {
                        wait ?
                           <button type="submit"><RemixIcons.RiDoorOpenLine size={18} /> Se connecter</button> :
                           <button>Vérification <span className='ms-2'><Spinners.TailSpin height="20" width="20" ariaLabel="tail-spin-loading" radius="5" color="#fff" /></span></button>
                     }
                  </div>
               </form>
            </div>
         </div>
      </div>
   )
}

export default Login