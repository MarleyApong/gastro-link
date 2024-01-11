import React, { useEffect, useState } from 'react'
import * as RemixIcons from "react-icons/ri"
import './website.scss'
import Img from '../../assets/img/cover_survey.jpg'
import undraw_survey from '../../assets/img/illustrations/undraw_survey.svg'
import StepItem from './StepItem'
import { useParams } from 'react-router-dom'
import { Company } from '../../services/companyService'

const Website = () => {
    const [data, setData] = useState([])
    const [questions, setQuestions] = useState([])
    const [step, setStep] = useState(0)
    const [send, setSend] = useState(false)

    const { id } = useParams()

    const increment = () => {
        if (step < 5) {
            setStep((current) => current + 1)
        }
    }

    const decrement = () => {
        setStep((current) => current - 1)
    }

    const subscibe = () => {
        setSend(true)
    }

    useEffect(() => {
        Company.getWebpage(id)
            .then((res) => {
                setData(res.data.content)
                setQuestions(res.data.content)
            })
    }, [])

    console.log(data);

    // const name = data.name.toUpperCase()
    // const survey = data.

    // const AllStep = [
    //     {
    //         question: "Comment avez vous trouvé notre accueil ?"
    //     },
    //     {
    //         question: "Comment avez vous trouvé notre animation ?"
    //     },
    //     {
    //         question: "Comment avez vous trouvé notre cuisine ?"
    //     },
    //     {
    //         question: "Comment avez vous trouvé notre boisson ?"
    //     },
    // ]

    return (
        <div className='Website'>
            <div className="Description">
                <div className="Img-Des">
                    <img src={Img} alt="" />
                </div>
                <div className="Desc">
                    <h1>A propos de nous</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim sapiente deserunt debitis libero sunt atque architecto ipsam fugit pariatur deleniti, est voluptate accusantium! Accusantium eos hic est doloremque dolorum voluptatum!
                        Ab veritatis autem, itaque blanditiis omnis deserunt aspernatur, repudiandae ducimus odio magni praesentium cumque eum enim pariatur labore provident atque maxime illum nostrum, inventore molestias nobis! Optio numquam facere iusto.
                    </p>
                </div>
            </div>
            <div className="Cont">
                <div className="Survey">
                    {
                        send === false ?
                            <div className="First">
                                <div className="Head">
                                    <h1>{data.name && data.name.toUpperCase()}</h1>
                                    <hr />
                                </div>
                                <div className="Body">
                                    <p className="Name-Survey">{data.name && data.surveys[0].name.toUpperCase()}</p>
                                    <p>Cher client, nous aimerions que vous notez notre service à travers les questions ci-dessous :</p>
                                    <div className="Survey-Cont">
                                        {
                                            step === 0 ?
                                                <div className="Quest-Content">
                                                    <span className="Question">Comment avez vous trouvé notre accueil ?</span>
                                                    <div className="Star">
                                                        <RemixIcons.RiStarLine />
                                                        <RemixIcons.RiStarLine />
                                                        <RemixIcons.RiStarLine />
                                                        <RemixIcons.RiStarLine />
                                                        <RemixIcons.RiStarLine />
                                                    </div>
                                                    <textarea name="" id="" cols="30" rows="10" placeholder='Votre avis sur la question'></textarea>
                                                </div>
                                                : step === 1 ?
                                                    <div className="Quest-Content">
                                                        <span className="Question">Comment avez vous trouvé notre animation ?</span>
                                                        <div className="Star">
                                                            <RemixIcons.RiStarLine />
                                                            <RemixIcons.RiStarLine />
                                                            <RemixIcons.RiStarLine />
                                                            <RemixIcons.RiStarLine />
                                                            <RemixIcons.RiStarLine />
                                                        </div>
                                                        <textarea name="" id="" cols="30" rows="10" placeholder='Votre avis sur la question'></textarea>
                                                    </div>
                                                    : step === 2 ?
                                                        <div className="Quest-Content">
                                                            <span className="Question">Comment avez vous trouvé notre cuisine ?</span>
                                                            <div className="Star">
                                                                <RemixIcons.RiStarLine />
                                                                <RemixIcons.RiStarLine />
                                                                <RemixIcons.RiStarLine />
                                                                <RemixIcons.RiStarLine />
                                                                <RemixIcons.RiStarLine />
                                                            </div>
                                                            <textarea name="" id="" cols="30" rows="10" placeholder='Votre avis sur la question'></textarea>
                                                        </div>
                                                        : step === 3 ?
                                                            <div className="Quest-Content">
                                                                <span className="Question">Comment avez vous trouvé notre boisson ?</span>
                                                                <div className="Star">
                                                                    <RemixIcons.RiStarLine />
                                                                    <RemixIcons.RiStarLine />
                                                                    <RemixIcons.RiStarLine />
                                                                    <RemixIcons.RiStarLine />
                                                                    <RemixIcons.RiStarLine />
                                                                </div>
                                                                <textarea name="" id="" cols="30" rows="10" placeholder='Votre avis sur la question'></textarea>
                                                            </div>
                                                            : step === 4 ?
                                                                <div className="Quest-Content">
                                                                    <span className="Question">Comment avez vous trouvé notre sécurité ?</span>
                                                                    <div className="Star">
                                                                        <RemixIcons.RiStarLine />
                                                                        <RemixIcons.RiStarLine />
                                                                        <RemixIcons.RiStarLine />
                                                                        <RemixIcons.RiStarLine />
                                                                        <RemixIcons.RiStarLine />
                                                                    </div>
                                                                    <textarea name="" id="" cols="30" rows="10" placeholder='Votre avis sur la question'></textarea>
                                                                </div>
                                                                : ""

                                        }
                                    </div>
                                    <div className="Nav-Step">
                                        {
                                            step > 0 ?
                                                <button className='Btn' onClick={decrement}> <RemixIcons.RiArrowDropLeftLine size={18} /> Précédent</button> : ""
                                        }
                                        {
                                            step === 4 ?
                                                <button className='Btn' onClick={subscibe}>Envoyer <RemixIcons.RiSendPlaneLine size={18} /></button> :
                                                <button className='Btn' onClick={increment}>Suivant <RemixIcons.RiArrowDropRightLine size={18} /></button>
                                        }
                                    </div>
                                </div>
                                <div className="Step-Cont">
                                    <StepItem index={0} step={step} />
                                    <StepItem index={1} step={step} />
                                    <StepItem index={2} step={step} />
                                    <StepItem index={3} step={step} />
                                    <StepItem index={4} step={step} />
                                </div>
                            </div>
                            :
                            <div className="Second">
                                <div className="Survey-Success">
                                    <div className="Circle-check Success">
                                        <RemixIcons.RiCheckDoubleLine className='Icon-Check' />
                                    </div>
                                    <span>Nous vous remercions pour vos reponses</span>
                                </div>
                                <div className="Quest-Content">
                                    <span>Aimeriez-vous, que nous vous contactons ?</span>
                                    <form action="" className='Form-Subscribe'>
                                        <input type="text" placeholder='Votre nom' />
                                        <input type="text" placeholder='Votre numéro de téléphone' />
                                        <input type="email" placeholder='Votre email' />
                                        <div className="Nav-Step">
                                            <button className='Btn'>Non</button>
                                            <button className='Btn'>Envoyer <RemixIcons.RiSendPlaneLine size={18} /></button>
                                        </div>
                                    </form>
                                </div>

                                <img src={undraw_survey} alt="" className="Back-Image" />

                            </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default Website