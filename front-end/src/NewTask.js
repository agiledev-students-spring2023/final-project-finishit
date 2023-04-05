/* eslint-disable */
import './NewTask.css'
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault() // prevent the default browser form submission stuff
        axios
            .post('http://localhost:5002/newtask', {
                stringname: name,
                dateduedate: duedate,
                dateremdate: remdate
            })
            .then(response => {
                console.log(`Received server response: ${response.data}`)
                navigate('/')
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
            <form method="POST" onSubmit={e => handleSubmit(e)}> 
                <div>
                    <label>Name of Task:</label>
                    <br />
                    <input className="taskInputBox" type="text" onChange={e => setName(e.target.value) }/>
                </div>
                <div>
                    <label>Reminder Date:</label>
                    <br />
                    <input type="date" onChange={e => setremdate(e.target.value)} ref={dateInputRef} />
                </div>
                <div>
                    <label>Due Date:</label>
                    <br />
                    <input type="date" onChange={e => setduedate(e.target.value)} ref={dateInputRef} />
                </div>

                <div>
                    <button className="submitButton" type="submit" >Submit Task</button>
                </div>
            </form>
        </>
    )
}

export default NewTask
