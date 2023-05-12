import './FormMessage.css'
import React from 'react'

const FormMessage = props => {
    let textToShow = props.text
    if (Array.isArray(textToShow)) {
        if (textToShow.length > 1) {
            textToShow = (<ul>{textToShow.map(val => (<li>{val}</li>))}</ul>)
        } else {
            textToShow = textToShow[0]
        }
    }
    return (
        <div className={`formMessage ${props.class}`}>
            {textToShow}
        </div>
    )
}

export default FormMessage
