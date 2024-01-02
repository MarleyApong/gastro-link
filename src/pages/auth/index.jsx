import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { PulseLoader } from 'react-spinners'
import * as RemixIcons from "react-icons/ri"
import './login.scss'
import logo from '../../assets/imgs/logo/cs-logo-red.png'
import { authentification } from '../../services/authentification'
import { account } from '../../services/account'

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
            const res = await authentification.login(email, password)
            setWait(true)
            if (res.data.status !== 1) {
               toast.error("Accès non authorisé !")
            }
            else {
               account.saveToken(res.data.token, res.data.id, res.data.role, res.data.env)
               Navigate("/dashboard")
            }

         } catch (err) {
            setWait(true)
            console.log("Err: ", err)
            if (err.response) {
               if (err.response.data.error.name === 'NotFound') {
                  toast.error("Email ou mot de passe incorrect !")
               }
               else if (err.response.data.error.name === 'ProcessHashFailed') {
                  toast.error("Email ou mot de passe incorrect !")
               }
               else if (err.response.data.error.name === 'MissingData') {
                  toast.error("Veuillez remplir tous les champs !")
               }
               else {
                  toast.error("Oups ! Quelque chose a mal tournée.", {
                     style: {
                        textAlign: 'center',
                        width: 'auto'
                     }
                  })
               }
            }
            else {
               toast.error("Connexion au serveur a échoué !")
            }
         }
      }
   }

   return (
      <div className="Login">
         <div className="Container">
            <div className="Left">
               <h1>Bienvenue sur customer space</h1>
               <p>Connectez-vous pour continuer</p>
               <span>Copyright &#xa9;customer-space 2024 | <a target='_blank' href="https://www.allhcorp.com" rel="noreferrer">made by allhcorp</a> </span>
            </div>
            <div className="Right">
               <form onSubmit={handleLogin} method='post' className="Form">
                  <div className="Logo">
                     <img src={logo} alt="" />
                     <span>customer <strong>space</strong></span>
                  </div>
                  <h2>Connexion</h2>
                  <div className="InputBox">
                     <div className="Icon">
                        <RemixIcons.RiMailLine />
                     </div>
                     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' autoComplete='off' />
                  </div>
                  <div className="InputBox">
                     <div className="Icon">
                        <RemixIcons.RiKeyLine />
                     </div>
                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Mot de passe' autoComplete='off' />
                  </div>
                  <div className="InputBox">
                     {
                        wait ?
                           <input type="submit" value='Se connecter' /> :
                           <button>Vérification <PulseLoader color="#fff" size='5' /></button>
                     }
                  </div>
               </form>
            </div>
         </div>
      </div>
   )
}

export default Login