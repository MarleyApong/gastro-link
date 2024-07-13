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
  const timeout = 5 * 60 * 1000 // 5 minutes
  const alertTimeout = 20 * 1000 // 20 seconds

  useEffect(() => {
    // Check if the user is on an authenticated route
    if (!location.pathname.startsWith('/auth')) {
      setIsUserActive(true)
    } else {
      setIsUserActive(false)
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
          handleLogout()
        } else if (result.isConfirmed) {
          resetIdleTimer()
        }
      })
    }
  }

  const resetIdleTimer = () => {
    if (idleTimerRef.current) {
      idleTimerRef.current.reset()
    }
  }

  const handleLogout = () => {
    sessionStorage.clear()
    navigate('/auth/login')
    setIsUserActive(false)
  }

  useIdleTimer({
    timeout,
    onIdle: handleOnIdle,
    debounce: 500,
    ref: idleTimerRef,
    events: ['mousemove', 'keydown', 'mousedown', 'touchstart'],
  })

  // Render nothing if user is not active
  if (!isUserActive) {
    return null
  }

  return null // Make sure to return something even if it's null
}

export default InactivityHandler