import { toast } from "react-hot-toast"
import { Account } from "../services/accountService"

const useHandleError = (err, Navigate, setValidator) => {
   if (err.response) {
      if (err.response.data) {
         if (err.response.data === 'Fuck you !') {

         }
         else if (err.response.data.name === 'MissingData') {
            toast.error("Données incomplètes !")
         }
         else if (err.response.data.name === 'MissingParams') {
            toast.error("Paramètre manquante !")
         }
         else if (err.response.data.name === 'AccessForbidden') {
            toast.error("Contactez votre superviseur.")
            toast.error("Accès refusé !")
         }
         else if (err.response.data.name === 'BadRequest') {
            toast.error("Mauvaise requête !")
         }
         else if (err.response.data.name === 'AddSurveyError') {
            toast.error("La limite des enquêtes est fixée à 5 !")
         }
         else if (err.response.data.name === 'NotAuthorizedToModified') {
            toast.error("Vous n'êtes pas authorisé à éffectuer cette opération !")
         }
         else if (err.response.data.name === 'NotFound') {
            toast.error("Demande ou données non trouvée !")
         }
         else if (err.response.data.name === 'ProcessCompareFailed') {
            setValidator(1);
            toast.error("Erreur, mot de passe incorret !")
         }
         else if (err.response.data.name === 'RegexPasswordValidationError') {
            setValidator(2)
            toast.error("Le nouveau mot de passe n'est pas valide !")
         }
         // NEW SYSTEM
         else if (err.response.data.name === 'AnswerAlreadyExist') {
            toast.error("Réessayez !")
            toast.error("Erreur, cette réponse existe déjà !")
         }
         else if (err.response.data.name === 'AnswerNotAdd') {
            toast.error("Réessayez !")
            toast.error("Erreur, votre réponse n'a pas été envoyée !")
         }
         else if (err.response.data.name === 'AddSurveyError') {
            toast.error("Erreur, enquête non ajoutée !")
         }
         else if (err.response.data.name === 'AddCompanyError') {
            toast.error("Erreur, entreprise non ajoutée !")
         }
         else if (err.response.data.name === 'AddStatusError') {
            toast.error("Erreur, statut non ajouté !")
         }
         else if (err.response.data.name === 'CompanyUpdateError') {
            toast.error("Erreur, entreprise non modifiée !")
         }
         else if (err.response.data.name === 'StatusUpdateError') {
            toast.error("Erreur, statut non modifié !")
         }
         else if (err.response.data.name === 'PictureCompanyUpdateError') {
            toast.error("Erreur, l'importation du profil de l'entreprise a échoué !")
         }
         else if (err.response.data.name === 'PictureOrganizationUpdateError') {
            toast.error("Erreur, l'importation du profil de l'organisation a échoué !")
         }
         else if (err.response.data.name === 'StatusCompanyUpdateError') {
            toast.error("Erreur, le statut de l'entreprise n'a pas été modifié !")
         }
         else if (err.response.data.name === 'StatusOrganizationUpdateError') {
            toast.error("Erreur, le statut de l'organisation n'a pas été modifié !")
         }
         else if (err.response.data.name === 'CompanyAlreadyDeleted') {
            toast.error("Erreur, cette entreprise a déjà été suprimée !")
         }
         else if (err.response.data.name === 'OrganizationAlreadyDeleted') {
            toast.error("Erreur, cette organisation a déjà été suprimée !")
         }
         else if (err.response.data.name === 'CompanyAlreadyRestored') {
            toast.error("Erreur, cette entreprise a déjà été restaurée !")
         }
         else if (err.response.data.name === 'OrganizationAlreadyRestored') {
            toast.error("Erreur, cette organisation a déjà été restaurée !")
         }
         else if (err.response.data.name === 'CustomerAlreadyExist') {
            toast.error("Réessayez")
            toast.error("Erreur, cette donnée existe déjà !")
         }
         else if (err.response.data.name === 'CustomerAlreadyDeleted') {
            toast.error("Erreur, ce client n'existe plus !")
         }
         else if (err.response.data.name === 'CustomerAlreadyRestored') {
            toast.error("Erreur, ce client a déjà été restauré !")
         }
         else if (err.response.data.name === 'OrganizationAlreadyExist') {
            toast.error("Erreur, cette organisation existe déjà !")
         }
         else if (err.response.data.name === 'AddOrganizationError') {
            toast.error("Erreur, organisation non ajoutée !")
         }
         else if (err.response.data.name === 'OrganizationUpdateError') {
            toast.error("Erreur, organisation non modifiée !")
         }
         else if (err.response.data.name === 'ProductAlreadyExist') {
            toast.error("Erreur, ce produit existe déjà !")
         }
         else if (err.response.data.name === 'ProductUpdateError') {
            toast.error("Erreur, produit non modifié !")
         }
         else if (err.response.data.name === 'PictureProductUpdateError') {
            toast.error("Erreur, l'importation de l'image du produit a échoué !")
         }
         else if (err.response.data.name === 'StatusProductUpdateError') {
            toast.error("Erreur, statut du produit non modifié !")
         }
         else if (err.response.data.name === 'ProductAlreadyDeleted') {
            toast.error("Erreur, ce produit n'existe plus !")
         }
         else if (err.response.data.name === 'ProductAlreadyRestored') {
            toast.error("Erreur, ce produit a déjà été restauré !")
         }
         else if (err.response.data.name === 'QuestionAlreadyExist') {
            toast.error("Erreur, cette question existe déjà !")
         }
         else if (err.response.data.name === 'AddQuestionError') {
            toast.error("Erreur, question non ajouté !")
         }
         else if (err.response.data.name === 'QuestionUpdateError') {
            toast.error("Erreur, question non modifié !")
         }
         else if (err.response.data.name === 'QuestionAlreadyDeleted') {
            toast.error("Erreur, cette question n'existe plus !")
         }
         else if (err.response.data.name === 'QuestionAlreadyRestored') {
            toast.error("Erreur, cette question a déjà été restaurée !")
         }
         else if (err.response.data.name === 'TableAlreadyExist') {
            toast.error("Erreur, cette table existe déjà !")
         }
         else if (err.response.data.name === 'TableUpdateError') {
            toast.error("Erreur, table non modifiée !")
         }
         else if (err.response.data.name === 'TableAlreadyDeleted') {
            toast.error("Erreur, cette table n'existe plus !")
         }
         else if (err.response.data.name === 'TableAlreadyRestored') {
            toast.error("Erreur, cette table a déjà été restaurée !")
         }
         else if (err.response.data.name === 'UserAlreadyExist') {
            toast.error("Erreur, cette utilisateur existe déjà !")
         }
         else if (err.response.data.name === 'UserUpdateError') {
            toast.error("Erreur, utilisateur non modifié !")
         }
         else if (err.response.data.name === 'StatusUpdateError') {
            toast.error("Erreur, statut non modifié !")
         }
         else if (err.response.data.name === 'RoleUpdateError') {
            toast.error("Erreur, rôle non modifié !")
         }
         else if (err.response.data.name === 'PasswordUserUpdateError') {
            toast.error("Erreur, mot de passe non modifié !")
         }
         else if (err.response.data.name === 'UserAlreadyDeleted') {
            toast.error("Erreur, cette utilisateur n'existe plus !")
         }
         else if (err.response.data.name === 'UserAlreadyRestored') {
            toast.error("Erreur, cette utilisateur a déjà été restauré !")
         }
         else if (err.response.data.name === 'AddUserError') {
            toast.error("Erreur, utilisateur non ajouté !")
         }
         else if (err.response.data.name === 'EnvsNotFound') {
            toast.error("Erreur, données de l'evironnement non trouvée !")
         }
         else if (err.response.data.name === 'StatusNotFound') {
            toast.error("Erreur, données du statut non trouvée !")
         }
         else if (err.response.data.name === 'RoleNotFound') {
            toast.error("Erreur, données du rôle non trouvée !")
         }
         else if (err.response.data.name === 'UserAutNotFound') {
            toast.error("Erreur, ce compte n'existe pas !")
         }
         else if (err.response.data.name === 'AnswersNotFound') {
            toast.error("Erreur, aucune réponse trouvée !")
         }
         else if (err.response.data.name === 'AnswerNotFound') {
            toast.error("Erreur, réponse non trouvée !")
         }
         else if (err.response.data.name === 'CompaniesNotFound') {
            toast.error("Erreur, aucune entreprise trouvée !")
         }
         else if (err.response.data.name === 'CompanyNotFound') {
            toast.error("Erreur, entreprise non trouvée !")
         }
         else if (err.response.data.name === 'CustomersNotFound') {
            toast.error("Erreur, aucun client trouvé !")
         }
         else if (err.response.data.name === 'CustomerNotFound') {
            toast.error("Erreur, client non trouvé !")
         }
         else if (err.response.data.name === 'OrganizationsNotFound') {
            toast.error("Erreur, aucune organisation trouvée !")
         }
         else if (err.response.data.name === 'OrganizationNotFound') {
            toast.error("Erreur, organisation non trouvée !")
         }
         else if (err.response.data.name === 'ProductsNotFound') {
            toast.error("Erreur, aucun produit trouvé !")
         }
         else if (err.response.data.name === 'ProductNotFound') {
            toast.error("Erreur, produit non trouvé !")
         }
         else if (err.response.data.name === 'QuestionsNotFound') {
            toast.error("Erreur, aucune question trouvée !")
         }
         else if (err.response.data.name === 'QuestionNotFound') {
            toast.error("Erreur, question non trouvée !")
         }
         else if (err.response.data.name === 'TablesNotFound') {
            toast.error("Erreur, aucune table trouvée !")
         }
         else if (err.response.data.name === 'TableNotFound') {
            toast.error("Erreur, table non trouvée !")
         }
         else if (err.response.data.name === 'UsersNotFound') {
            toast.error("Erreur, aucun utilisateur trouvé !")
         }
         else if (err.response.data.name === 'UserNotFound') {
            toast.error("Erreur, utilisateur non trouvé !")
         }
         else if (err.response.data.name === 'MulterError') {
            toast.error("La taille du fichier doit être < 2 Mo.")
            toast.error("Erreur, l'image est trop volumineux !")
         }
         else {
            toast.error("Quelque chose a mal tourné.")
            toast.error("Oups !")
         }
      }
   }
   else {
      toast.error("Connexion au serveur a échoué !")
   }
}

export default useHandleError