import React, { useEffect, useState } from 'react'
import * as RemixIcons from "react-icons/ri"
import './note.scss'
import StepItem from './StepItem'
import { useNavigate, useParams } from 'react-router-dom'
import { Company } from '../../../services/companyService'
import { Answer } from '../../../services/answersService'
import Swal from 'sweetalert2'
import { v4 as uuid } from 'uuid'
import { Customer } from '../../../services/customerService'
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui'
import surveyJson from '../../../data/survey (1).json'
import themeJson from '../../../data/survey_theme.json'


const Note = () => {
    const [data, setData] = useState([])
    const [questions, setQuestions] = useState([])
    const [responses, setResponses] = useState([])
    const [step, setStep] = useState(0)
    const [send, setSend] = useState(false)
    const [stateMsg, setStateMsg] = useState(false)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const { company } = useParams()
    const navigate = useNavigate()
    const currentHour = new Date().getHours()
    const isDaytime = currentHour >= 6 && currentHour < 18
    const idCustomer = uuid()

    const increment = () => {
        if (step < 5) {
            setStep(current => current + 1)
            setStateMsg(false)
        }
    }

    const decrement = () => {
        setStep(current => current - 1)
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await Company.getWebpage(company)
                setData(res.data.content)
                setQuestions(res.data.content.surveys[0].Questions)
                setResponses(res.data.content.surveys[0].Questions.map(() => ({ idQuestion: '', note: 0, suggestion: '', idCustomer: idCustomer })))
            } catch (err) {
                // console.log('err', err);
                // Navigate(-1)
            }
        }

        loadData()
    }, [company])

    const handleStarClick = (index, note, idQuestion) => {
        setResponses(prevQuestions => {
            const updatedQuestions = [...prevQuestions]
            updatedQuestions[index] = { ...updatedQuestions[index], note: note, idQuestion: idQuestion }
            return updatedQuestions
        })
    }

    const handleSuggestionChange = (index, suggestion) => {
        setResponses(prevResponses => {
            const updatedResponses = [...prevResponses]
            updatedResponses[index] = { ...updatedResponses[index], suggestion: suggestion }
            return updatedResponses
        })
    }

    const handleSubmitNote = (e) => {
        e.preventDefault()
        Swal.fire({
            title: 'Envoi en cours...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        })

        Answer.add(responses)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Vos réponses ont été envoyées !',
                    didClose: () => {
                        setSend(true)
                    }
                })
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Envoi échouée !',
                })
            })

    }

    const idCustomer2 = responses.length > 0 ? responses[0].idCustomer : null

    const handleSubmitInfo = (e) => {
        e.preventDefault()
        const data = {
            name: name,
            phone: phone
        }

        Swal.fire({
            title: 'Envoi en cours...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        })

        Customer.update(idCustomer2, data)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: `Cher ${name}, nous vous remercions pour votre soutien !`,
                })
                setSend(false)
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Envoi échouée !',
                })
            })
    }

    const handleReturnToHome = () => {
        navigate('/'); // Redirige vers la page d'accueil
    }

    const survey = new Model(surveyJson)
    survey.applyTheme(themeJson)

    survey.onAfterRenderSurvey.add((survey, options) => {
        const navBar = document.querySelector('.sd-action-bar.sd-footer.sd-body__navigation.sd-clearfix')
        if (navBar && !navBar.querySelector('.custom-return-button')) {
            const button = document.createElement('button')
            button.className = 'Btn Error custom-return-button'
            button.textContent = 'Retour à l\'accueil'
            button.onclick = handleReturnToHome
            navBar.insertBefore(button, navBar.firstChild)
        }
    })

    survey.onComplete.add((result) => {
        // Example: Sending survey results to backend using fetch
        fetch('http://your-backend-url/api/survey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result.data) // Assuming result.data contains the survey results
        })
        .then(response => response.json())
        .then(data => {
            console.log('Survey results sent successfully:', data)
            Swal.fire({
                icon: 'success',
                title: 'Survey submitted successfully!',
            })
        })
        .catch(error => {
            console.error('Error sending survey results:', error)
            Swal.fire({
                icon: 'error',
                title: 'Failed to submit survey!',
            })
        })
    })

    return (
        <Survey model={survey} />
    )
}

export default Note
