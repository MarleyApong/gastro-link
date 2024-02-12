import React from 'react'

const StepItem = ({ index, step }) => {
    const active = (step, index) => {
        if (step === index) return true
    }
    
    const isActive = active(step, index)
    return (
        <div className={isActive ? "Step-Active" : "Step"}>
            {index + 1}
        </div>
    )
}

export default StepItem