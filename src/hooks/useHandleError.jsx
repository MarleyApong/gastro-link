import { toast } from "react-hot-toast"
import { Account } from "../services/accountService"

const useHandleError = (err, Navigate, setValidator) => {
   if (err.response) {
      if (err.response.data.error) {
         if (err.response.data.error.name === 'MissingData') {
            toast.error("Données incomplètes !")
         }
         else if (err.response.data.error.name === 'MissingParams') {
            toast.error("Paramètre manquante !")
         }
         else if (err.response.data.error.name === 'AccessForbidden') {
            toast.error("Contactez votre superviseur.")
            toast.error("Accès refusé !")
         }
         else if (err.response.data.error.name === 'BadRequest') {
            toast.error("Mauvaise requête !")
         }
         else if (err.response.data.error.name === 'NotFound') {
            toast.error("Demande ou données non trouvée !")
         }
         else if (err.response.data.error.name === 'ProcessCompareFailed') {
            setValidator(1);
            toast.error("Erreur, mot de passe incorret !")
         }
         else if (err.response.data.error.name === 'RegexPasswordValidationError') {
            setValidator(2)
            toast.error("Le nouveau mot de passe n'est pas valide !")
         }
         else {
            toast.error("Quelque chose a mal tourné.");
            toast.error("Oups !")
         }
      }
      
   }
   else {
      toast.error("Connexion au serveur a échoué !")
   }
}

export default useHandleError