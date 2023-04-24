import './EditTask.css'
import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
// eslint-disable-next-line import/no-unresolved
import Multiselect from 'multiselect-react-dropdown'

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
        /*
        name: '',
        duedate: '',
        status: ''
        */
    })

    const [badges, setBadges] = useState([])
    const [options, setOpts] = useState([])

    const navigate = useNavigate()

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
            status1: status,
            badges: badges.map(val => val.id.toString())
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
                    console.log(dataTask)
                    setName(dataTask.title)
                    setduedate(dataTask.dueDate.toString().substring(0, 10))
                    setstatus(dataTask.status)
                    // console.log(dataTask.status)
                    setBadges(dataTask.badges)
                    setOpts(response.data.allBadges)
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
            <h1>Edit Task</h1>
            <form method="POST" onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Name of Task:</label>
                    <br />
                    <input className="inputBox3" type="text" defaultValue={name} onChange={e => setName(e.target.value)} />
                </div>

                <div>
                    <br />
                    <label>Due Date:</label>
                    <br />
                    <input type="date" defaultValue={duedate} onChange={e => setduedate(e.target.value)} ref={dateInputRef} />
                </div>

                <div>
                    <br />
                    <label>Status:</label>
                    <br />
                    <select
                        defaultValue={status}
                        onChange={e => setstatus(e.target.value)}
                    >
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
                    <button className="submitButton deleteButton" type="submit">Delete Task</button>
                </div>
            </form>
        </>
    )
}

export default EditTask
