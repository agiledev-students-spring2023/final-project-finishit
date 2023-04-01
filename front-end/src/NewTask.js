import './NewTask.css'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const NewTask = props => {
    const [date, setDate] = useState('')
    const dateInputRef = useRef(null)
    const handleChange = e => {
        setDate(e.target.value)
    }

    const [name, setName] = useState('')
    const [duedate, setduedate] = useState('')
    const [remdate, setremdate] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = e => {
        e.preventDefault() // prevent the default browser form submission stuff
        axios
            .post('/main', {
                stringname: name,
                dateduedate: duedate,
                dateremdate: remdate
            })
            .then(response => {
                console.log(`Received server response: ${response.data}`)
            })
            .catch(err => {
                // failure
                console.log(`Received server error: ${err}`)
                setError(
                    'Invalid inputs, check again.'
                )
            })
    }

    return (
        <>
            <h1>New Task</h1>
            <form action="/" method="POST">
                <div>
                    <label>Name of Task:</label>
                    <br />
                    <input className="taskInputBox" type="text" />
                </div>
                <div>
                    <label>Reminder Date:</label>
                    <br />
                    <input type="date" onChange={handleChange} ref={dateInputRef} />
                </div>
                <div>
                    <label>Due Date:</label>
                    <br />
                    <input type="date" onChange={handleChange} ref={dateInputRef} />
                </div>

                <div>
                    <Link to="/"><button className="submitButton" type="submit">Submit Task</button></Link>
                </div>
            </form>
        </>
    )
}

export default NewTask
