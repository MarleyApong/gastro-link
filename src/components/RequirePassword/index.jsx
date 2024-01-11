import './Settings.scss'

const RequirePassword = () => {

   return (
      <div className="require-password">
         <h5>Critère du mot de passe </h5>
         <ul>
            <li>Au moins 8 caractères minimun</li>
            <li>Au moins 1 Lettre majuscule</li>
            <li>Au moins 1 chiffre</li>
            <li>Au moins 1 caractère special compris entre <b> @$!%*?&</b></li>
         </ul>
      </div>
   )
}

export default RequirePassword