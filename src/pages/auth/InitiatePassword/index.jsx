import React, { useState } from 'react'
import * as RemixIcons from "react-icons/ri"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import * as Spinners from 'react-loader-spinner'
import { AuthService } from '../../../services/authService'
import { Account } from '../../../services/accountService'
import logo from '../../../assets/img/logo/cs-logo-red.png'
import './initiatePassword.scss'
import { jwtDecode } from 'jwt-decode'
import Swal from 'sweetalert2'

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{}|;:,.<>?]).{8,}$/

const InitiatePassword = () => {
   const navigate = useNavigate()
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [wait, setWait] = useState(true)

   const validatePassword = () => {
      if (password === '') {
         return 'Le mot de passe ne peut pas être vide'
      } else if (!passwordRegex.test(password)) {
         return 'Le mot de passe doit comporter au moins 8 caractères, avec une majuscule, une minuscule, un chiffre et un caractère spécial'
      } else {
         return ''
      }
   }

   const validateConfirmPassword = () => {
      if (confirmPassword === '') {
         return 'Le mot de passe de confirmation ne peut pas être vide'
      } else if (password !== confirmPassword) {
         return 'Les mots de passe ne correspondent pas'
      } else {
         return ''
      }
   }

   const handleInitiatePassword = async (e) => {
      e.preventDefault()
      const passwordError = validatePassword()
      const confirmPasswordError = validateConfirmPassword()

      if (passwordError || confirmPasswordError) {
         Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: passwordError || confirmPasswordError
         })
         return
      }

      setWait(false)
      try {
         const res = await AuthService.setPassword(Account.getInitiateEmail(), Account.getTemporaryPassword(), password)
         Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: res.data.message
         }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
               navigate('/auth/login')
            }
         })
         setWait(true)
      } catch (err) {
         setWait(true)
         if (err.response) {
            if (err.response.data.name === 'UserAutNotFound') {
               toast.error("Email ou mot de passe incorrect !")
            } else if (err.response.data.name === 'ProcessHashFailed') {
               toast.error("Email ou mot de passe incorrect !")
            } else if (err.response.data.name === 'MissingData') {
               toast.error("Veuillez remplir tous les champs !")
            } else if (err.response.data.name === 'BadRequest') {
               toast.error("Mauvaise requête !")
            } else if (err.response.data.name === 'NotFound') {
               toast.error("Demande non trouvée !")
            } else if (err.response.data.name === 'AccessForbidden') {
               toast.error("Contactez votre superviseur.")
               toast.error("Accès refusé !")
            } else {
               toast.error("Quelque chose a mal tourné.")
               toast.error("Oups !")
            }
         } else {
            toast.error("Vérifiez votre connexion !")
         }
      }
   }

   return (
      <div className="InitiatePassword">
         <div className="Container">
            <div className="Left">
               <h1>Bienvenue sur gastro link</h1>
               <p>Veuillez enregistrer votre mot de passe pour finaliser votre compte <RemixIcons.RiArrowRightLine /></p>
               <span>
                  Copyright &#xa9;gastro link 2024
               </span>
            </div>
            <div className="Right">
               <form onSubmit={handleInitiatePassword} method='post' className="Form">
                  <div className="Logo">
                     <img src={logo} alt="" />
                     <span>Gastro <strong>Link</strong></span>
                  </div>
                  <h2>INITIATE PASSWORD</h2>
                  <div className="InputBox">
                     <div className="Icon">
                        <RemixIcons.RiKeyLine size={18} />
                     </div>
                     <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={validatePassword}
                        placeholder='Mot de passe'
                        autoComplete='off'
                        autoFocus
                     />
                  </div>
                  <div className="InputBox">
                     <div className="Icon">
                        <RemixIcons.RiShieldCheckLine size={18} />
                     </div>
                     <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={validateConfirmPassword}
                        placeholder='Entrez encore'
                        autoComplete='off'
                     />
                  </div>
                  <div className="InputBox">
                     {
                        wait ?
                           <button type="submit"><RemixIcons.RiShieldCheckLine size={18} /> Enregistrer</button> :
                           <button><span className='ms-2'><Spinners.TailSpin height="20" width="20" ariaLabel="tail-spin-loading" radius="5" color="#fff" /></span> Enregistrement</button>
                     }
                  </div>
               </form>
            </div>
         </div>
      </div>
   )
}

export default InitiatePassword