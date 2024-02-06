import { toast } from "react-hot-toast"
import { Account } from "../services/accountService"

const useHandleError = (err, Navigate, setValidator) => {
   if (err.response) {
      switch (err.response.data.error.name) {
         case 'MissingData':
            toast.error("Données incomplètes !")
            break
         case 'MissingParams':
            toast.error("Paramètre manquante !")
            break
         case 'AccessForbidden':
            toast.error("Contactez votre superviseur.")
            toast.error("Accès refusé !")
            break
         case 'BadRequest':
            toast.error("Mauvaise requête !")
            break
         case 'NotFound':
            toast.error("Demande ou données non trouvée !")
            break
         case 'AccessForbidden':
            Account.logout()
            Navigate('/auth/login')
            toast.error("Contactez votre superviseur.")
            toast.error("Accès refusé !")
            break
         case 'ProcessCompareFailed':
            setValidator(1)
            toast.error("Erreur, mot de passe incorret !")
            break
         case 'RegexPasswordValidationError':
            setValidator(2)
            toast.error("Le nouveau mot de passe n'est pas valide !")
            break
         default:
            switch (err.response.data.message) {
               case 'missing token':
                  Navigate('/auth/login')
                  toast.error("Token manquant !")
                  break
               case 'bad token':
                  Navigate('/auth/login')
                  toast.error("Votre session a expiré !")
                  break
               default:
                  toast.error("Quelque chose a mal tourné.")
                  toast.error("Oups !")
            }
      }
   } else {
      toast.error("Connexion au serveur a échoué !")
   }
}

export default useHandleError