import './NewTask.css'
import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Multiselect from 'multiselect-react-dropdown'
import FormMessage from './FormMessage'

const NewTask = props => {
    const jwtToken = localStorage.getItem('token')

    const [date, setDate] = useState('')
    const dateInputRef = useRef(null)
    const [name, setName] = useState('')
    const [duedate, setduedate] = useState('')
    const [status, setstatus] = useState('')
    const [error, setError] = useState(undefined)

    const [options, setOptions] = useState([])
    const [badges, setBadges] = useState([])

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault() // prevent the default browser form submission stuff
        axios
            .post(
                `${process.env.REACT_APP_SERVER_HOSTNAME}/newtask`,
                {
                    stringname: name,
                    dateduedate: duedate,
                    status1: status,
                    badges
                },
                {
                    headers: { Authorization: `JWT ${jwtToken}` }
                }
            )
            .then(response => {
                if (response.data.addSuccess) {
                    navigate('/')
                } else if (response.data.status) {
                    setError({ class: 'error', text: response.data.status })
                }
            })
            .catch(err => {
                // failure
                setError({ class: 'error', text: 'Something went wrong. Please try again later.' })
                if (err.response && err.response.status === 401) {
                    navigate('/')
                }
            })
    }

    const handleSelect = selectedList => {
        setBadges(selectedList)
    }

    const handleRemove = selectedList => {
        setBadges(selectedList)
    }

    useEffect(() => {
        async function fetchBadges() {
            if (!jwtToken) {
                navigate('/login')
                return
            }
            try {
                const fetchedBadges = await axios.get(
                    `${process.env.REACT_APP_SERVER_HOSTNAME}/badges`,
                    { headers: { Authorization: `JWT ${jwtToken}` } }
                )
                if (fetchedBadges.data.status) {
                    setError(fetchedBadges.data.status)
                } else {
                    setOptions(fetchedBadges.data.badges)
                    setError('')
                }
            } catch (err) {
                setError(
                    'Something went wrong when fetching badges. Please try again later.'
                )
                if (err.response.status === 401) {
                    navigate('/login')
                }
            }
        }
        fetchBadges()
    }, [jwtToken, navigate])

    return (
        <>
            {error && (
                <FormMessage text={error.text} class={error.class} />
            )}
            <h1>New Task</h1>
            <form method="POST" onSubmit={e => handleSubmit(e)}>
                <div>
                    <br />
                    <label>Name of Task:</label>
                    <br />
                    <input
                        className="inputLogin"
                        type="text"
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div>
                    <br />
                    <label>Due Date</label>
                    <br />
                    <input
                        className="inputLogin"
                        type="date"
                        placeholder="Due Date"
                        onChange={e => setduedate(e.target.value)}
                        ref={dateInputRef}
                    />
                </div>

                <div>
                    <br />
                    <label>Status:</label>
                    <br />
                    <select
                        className="inputLogin"
                        defaultValue={status}
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
                        onSelect={handleSelect} // Function will trigger on select event
                        onRemove={handleRemove} // Function will trigger on remove event
                        displayValue="text"
                        style={{ optionContainer: { backgroundColor: 'white', zIndex: 100 } }}
                    />
                </div>
                <div>
                    <br />
                    <center>
                        <button className="submitButton" type="submit">
                            Submit Task
                        </button>
                        <button className="submitButton cancelNewBadge" type="button" onClick={e => { navigate('/') }}>Cancel</button>
                    </center>
                </div>
            </form>
        </>
    )
}

export default NewTask
