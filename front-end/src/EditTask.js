import './EditTask.css'
import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Multiselect from 'multiselect-react-dropdown'
import FormMessage from './FormMessage'

const EditTask = props => {
    const jwtToken = localStorage.getItem('token')

    const { id } = useParams()
    const dateInputRef = useRef(null)

    const [name, setName] = useState('')
    const [duedate, setduedate] = useState('')
    const [status, setstatus] = useState('')
    const [error, setError] = useState({})

    const [badges, setBadges] = useState([])
    const [options, setOpts] = useState([])

    const navigate = useNavigate()

    const handleDelete = e => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/deletetask/${id}`, {}, {
            headers: { Authorization: `JWT ${jwtToken}` }
        }).then(response => {
            if (response.data.deleteSuccess || response.data.invalidID) {
                navigate('/')
            } else if (response.data.status) {
                setError({ class: 'error', text: response.data.status })
            }
        }).catch(err => {
            // failure
            setError({ class: 'error', text: 'Something went wrong. Please try again later.' })
            if (err.response.status === 401) {
                navigate('/')
            }
        })
    }

    const handleSubmit = async e => {
        e.preventDefault() // prevent the default browser form submission stuff
        axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/tasks/${id}`, {
            stringname: name,
            dateduedate: duedate,
            status1: status,
            badges: badges.map(val => val._id.toString())
        }, {
            headers: { Authorization: `JWT ${jwtToken}` }
        }).then(response => {
            if (response.data.changedSuccess || response.data.invalidID) {
                navigate('/')
            } else if (response.data.status) {
                setError({ class: 'error', text: response.data.status })
            }
            // navigate('/')
        }).catch(err => {
            // failure
            setError(
                'Invalid inputs, check again.'
            )
        })
    }

    // when badge is added
    const handleSelect = selectedList => {
        setBadges(selectedList)
    }

    // when badge is removed
    const handleRemove = selectedList => {
        setBadges(selectedList)
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
                    const dataTask = response.data.task
                    setName(dataTask.title)
                    setduedate(dataTask.dueDate.toString().substring(0, 10))
                    setstatus(dataTask.status)
                    setBadges(dataTask.badges)
                    setOpts(response.data.allBadges)
                    setError('')
                }).catch(err => {
                    setError('Something went wrong. Please try again later.')
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
            {error && (
                <FormMessage text={error.text} class={error.class} />
            )}
            <h1>Task</h1>
            <form method="POST" onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Name of Task:</label>
                    <br />
                    <input className="inputLogin" type="text" defaultValue={name} onChange={e => setName(e.target.value)} />
                </div>

                <div>
                    <br />
                    <label>Due Date:</label>
                    <br />
                    <input className="inputLogin" type="date" defaultValue={duedate} onChange={e => setduedate(e.target.value)} ref={dateInputRef} />
                </div>

                <div>
                    <br />
                    <label>Status:</label>
                    <br />
                    <select
                        className="inputLogin"
                        value={status}
                        onChange={e => setstatus(e.target.value)}
                    >
                        <option value="" disabled hidden>Select an option</option>
                        <option value="NOT_STARTED">Not Started</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                </div>

                <div>
                    <br />
                    <label>Badges:</label>
                    <br />
                    <Multiselect
                        options={options} // Options to display in the dropdown
                        selectedValues={badges}
                        onSelect={handleSelect} // Function will trigger on select event
                        onRemove={handleRemove} // Function will trigger on remove event
                        displayValue="text"
                        style={{ optionContainer: { backgroundColor: 'white', zIndex: 100 } }}
                    />
                </div>

                <div>
                    <br />
                    <button className="submitButton" type="submit">Edit Task</button>
                </div>
            </form>

            <form method="POST" onSubmit={e => handleDelete(e)}>
                <div>
                    <br />
                    <center>
                        <button className="submitButton deleteButton" type="submit">Delete Task</button>
                        <button className="submitButton cancelButton" type="button" onClick={e => { navigate('/') }}>Discard Changes</button>
                    </center>
                </div>
            </form>
        </>
    )
}

export default EditTask
