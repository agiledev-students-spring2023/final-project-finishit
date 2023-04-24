import './EditTask.css'
import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditTask = props => {
    const jwtToken = localStorage.getItem('token')

    const { id } = useParams()
    const [date, setDate] = useState('')
    const dateInputRef = useRef(null)

    const [name, setName] = useState('')
    const [duedate, setduedate] = useState('')
    const [remdate, setremdate] = useState('')
    const [formData, setFormData] = useState('')
    const [status, setstatus] = useState('')
    const [error, setError] = useState({
        name: '',
        duedate: '',
        status: ''
    })

    const navigate = useNavigate()

    /* useEffect(() => {
        axios.get('/tasks').then(res => {
            setFormData(res.data)
        })
    }) */

    const handleDelete = e => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/deletetask/${id}`, {}, {
            headers: { Authorization: `JWT ${jwtToken}` }
        }).then(response => {
            if (response.data.deleteSuccess) {
                navigate('/')
            }
        }).catch(err => {
            // failure
            console.log(`Received server error: ${err}`)
        })
    }

    const handleSubmit = async e => {
        e.preventDefault() // prevent the default browser form submission stuff

        axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/tasks/${id}`, {
            stringname: name,
            dateduedate: duedate,
            status1: status
        }, {
            headers: { Authorization: `JWT ${jwtToken}` }
        }).then(response => {
            console.log(`Received server response: ${response.data}`)
            navigate('/')
        }).catch(err => {
            // failure
            console.log(`Received server error: ${err}`)
            setError(
                'Invalid inputs, check again.'
            )
        })
    }

    useEffect(() => {
        const fetchTask = () => {
            axios.get(
                `${process.env.REACT_APP_SERVER_HOSTNAME}/tasks/${id}`,
                { headers: { Authorization: `JWT ${jwtToken}` } }
            )
                .then(response => {
                    if (response.data.status) {
                        setError(response.data.status)
                        return
                    }
                    const dataTask = response.data.tasks
                    console.log(dataTask)
                    setName(dataTask.title)
                    setduedate(dataTask.duedate)
                    setstatus(dataTask.status)
                    setError('')
                }).catch(err => {
                    setError('Something went wrong. Please try again later.')
                    console.log(err)
                    if (err.response.status === 401) {
                        navigate('/')
                    }
                })
        }
        if (!jwtToken) {
            navigate('/')
        } else {
            fetchTask()
        }
    }, [jwtToken, id, navigate])

    return (
        <>
            <h1>Task</h1>
            <form method="POST" onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Name of Task:</label>
                    <br />
                    <input className="inputBox3" type="text" defaultValue={name} onChange={e => setName(e.target.value)} />
                </div>

                <div>
                    <label>Due Date:</label>
                    <br />
                    <input type="date" defaultValue={duedate} onChange={e => setduedate(e.target.value)} ref={dateInputRef} />
                </div>

                <div>
                    <label>Status:</label>
                    <br />
                    <input className="taskInputBox" type="text" defaultValue={status} onChange={e => setstatus(e.target.value)} />
                </div>

                <div>
                    <button className="submitButton" type="submit">Edit Task</button>
                </div>
            </form>

            <form method="POST" onSubmit={e => handleDelete(e)}>
                <div>
                    <button className="submitButton deleteButton" type="submit">Delete Task</button>
                </div>
            </form>
        </>
    )
}

export default EditTask
