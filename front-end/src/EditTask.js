import './EditTask.css'
import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const EditTask = props => {
    const [date, setDate] = useState('')
    const dateInputRef = useRef(null)

    const [name, setName] = useState('')
    const [duedate, setduedate] = useState('')
    const [remdate, setremdate] = useState('')
    const [formData, setFormData] = useState('')
    const [error, setError] = useState({
        name: '',
        duedate: '',
        remdate: ''
    })

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/tasks/').then(res => {
            setFormData(res.data)
        })
    })

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault() // prevent the default browser form submission stuff
        axios
            .post('http://localhost:5002/edittask', {
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

    const handleSubmit2 = e => {
        e.preventDefault()
        axios.put('/tasks', formData).then(() => {
            console.log('User updated successfully')
        })
    }

    return (
        <>
            <h1>Task</h1>
            <form method="POST" onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Name of Task:</label>
                    <br />
                    <input className="inputBox3" type="text" onChange={e => setName(e.target.value)} />
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
                    <button className="submitButton" type="submit">Edit Task</button>
                </div>

                <div>
                    <Link to="/"><button className="submitButton deleteButton" type="submit">Delete Task</button></Link>
                </div>
            </form>
        </>
    )
}

export default EditTask
