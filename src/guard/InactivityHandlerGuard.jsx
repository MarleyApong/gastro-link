import { useRef, useState, useEffect } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate, useLocation } from 'react-router-dom'

const MySwal = withReactContent(Swal)

const InactivityHandler = () => {
  const [isUserActive, setIsUserActive] = useState(false)
  const [isPromptVisible, setIsPromptVisible] = useState(false)
  const idleTimerRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const timeout = 10 * 60 * 1000 // 10 MINUTE INACTIVITY TIMEOUT
  const alertTimeout = 20 * 1000 // 20 SECOND ALERT TIMEOUT

  useEffect(() => {
    // CHECK IF THE USER IS ON AN AUTHENTICATED ROUTE
    if (location.pathname.startsWith('/auth') || location.pathname.startsWith('/page')) {
      setIsUserActive(false)
    } else {
      setIsUserActive(true)
    }
  }, [location.pathname])

  const handleOnIdle = () => {
    if (isUserActive && !isPromptVisible) {
      setIsPromptVisible(true)
      MySwal.fire({
        title: "Êtes-vous toujours là?",
        text: "Vous serez déconnecté automatiquement si aucune action n'est prise.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, je suis là',
        cancelButtonText: 'Non, déconnectez-moi',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        timer: alertTimeout,
        timerProgressBar: true,
      }).then(result => {
        setIsPromptVisible(false)
        if (result.dismiss === Swal.DismissReason.timer || result.isDismissed) {
          handleLogout() // LOG OUT USER IF NO RESPONSE
        } else if (result.isConfirmed) {
          resetIdleTimer() // RESET IDLE TIMEOUT IF USER IS STILL THERE
        }
      })
    }
  }

  const resetIdleTimer = () => {
    if (idleTimerRef.current) {
      idleTimerRef.current.reset() // RESET IDLE TIMEOUT
    }
  }

  const handleLogout = () => {
    sessionStorage.clear() // CLEAR SESSION DATA
    navigate('/auth/login') // REDIRECT TO LOGIN PAGE
    setIsUserActive(false) // UPDATE USER ACTIVITY STATUS
  }

  useIdleTimer({
    timeout,
    onIdle: handleOnIdle, // CALL HANDLEONIDLE WHEN USER IS IDLE
    debounce: 500,
    ref: idleTimerRef,
    events: ['mousemove', 'keydown', 'mousedown', 'touchstart'], // EVENTS THAT RESET IDLE TIMEOUT
  })

  // RENDER NOTHING IF USER IS NOT ACTIVE
  if (!isUserActive) {
    return null
  }

  return null // RENDER NULL EVEN IF USER IS ACTIVE
}

export default InactivityHandler