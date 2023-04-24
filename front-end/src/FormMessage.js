import './FormMessage.css'
import React from 'react'

const FormMessage = props => (
    <div className={`formMessage ${props.class}`}>
        {props.text}
    </div>
)

export default FormMessage
