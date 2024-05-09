import React, { useState } from 'react'
import * as RemixIcons from "react-icons/ri"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import * as Spinners from 'react-loader-spinner'
import { Authentification } from '../../services/authentificationService'
import { Account } from '../../services/accountService'
import logo from '../../assets/img/logo/cs-logo-red.png'
import './login.scss'

const Login = () => {
   const Navigate = useNavigate()
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [wait, setWait] = useState(true)

   const handleLogin = async (e) => {
      e.preventDefault()
      if (email === "" || password === "") {
         toast.error("Veuillez remplir tous les champs !")
      }
      else {
         setWait(false)
         try {
            const res = await Authentification.login(email, password)
            const token = res.data.token
            const idUser = res.data.user.id
            const role = res.data.user.Role.id
            const env = res.data.user.Env.id
            const idStatus = res.data.user.Status.id
            setWait(true)
            if (res.data.user.Status.name !== 'actif') {
               toast.error("Accès non authorisé !")
            }
            else {
               Account.saveToken(token, idUser, role, env, idStatus)
               Navigate("/dashboard")
            }

         } catch (err) {
            setWait(true)
            if (err.response) {
               if (err.response.data.name === 'UserAutNotFound') {
                  toast.error("Email ou mot de passe incorrect !")
               }
               else if (err.response.data.name === 'ProcessHashFailed') {
                  toast.error("Email ou mot de passe incorrect !")
               }
               else if (err.response.data.name === 'MissingData') {
                  toast.error("Veuillez remplir tous les champs !")
               }
               else if (err.response.data.name === 'BadRequest') {
                  toast.error("Mauvaise requête !")
               }
               else if (err.response.data.name === 'NotFound') {
                  toast.error("Demande non trouvée !")
               }
               else if (err.response.data.name === 'AccessForbidden') {
                  toast.error("Contactez votre superviseur.")
                  toast.error("Accès réfusé !")
               }
               else {
                  toast.error("Quelque chose a mal tournée.")
                  toast.error("Oups !")
               }
            }
            else {
               console.log('err', err)
               toast.error("Connexion au serveur a échoué !")
            }
         }
      }
   }

   return (
      <div className="Login">
         <div className="Container">
            <div className="Left">
               <h1>Bienvenue sur gastro link</h1>
               <span>Connectez-vous pour continuer</span>
               <span>Copyright &#xa9;gastro link 2024 | <a target='_blank' href="https://www.ccntechnologies.com/" rel="noreferrer">made by CCN&Technologies</a> </span>
            </div>
            <div className="Right">
               <form onSubmit={handleLogin} method='post' className="Form">
                  <div className="Logo">
                     <img src={logo} alt="" />
                     <span>Gastro <strong>Link</strong></span>
                  </div>
                  <h2>Connexion</h2>
                  <div className="InputBox">
                     <div className="Icon">
                        <RemixIcons.RiMailLine size={18} />
                     </div>
                     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' autoComplete='off' />
                  </div>
                  <div className="InputBox">
                     <div className="Icon">
                        <RemixIcons.RiKeyLine size={18}/>
                     </div>
                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Mot de passe' autoComplete='off' />
                  </div>
                  <div className="InputBox">
                     {
                        wait ?
                           <button type="submit">Se connecter</button> :
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