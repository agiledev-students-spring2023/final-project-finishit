import './NewTask.css'
import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Multiselect from 'multiselect-react-dropdown'

const NewTask = props => {
    const jwtToken = localStorage.getItem('token')

    const [date, setDate] = useState('')
    const dateInputRef = useRef(null)
    const handleChange = e => {
        setDate(e.target.value)
    }

    const [name, setName] = useState('')
    const [duedate, setduedate] = useState('')
    const [remdate, setremdate] = useState('')
    const [status, setstatus] = useState('')
    const [error, setError] = useState('')

    const [options, setOptions] = useState([])

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault() // prevent the default browser form submission stuff
        axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/newtask`, {
            stringname: name,
            dateduedate: duedate,
            dateremdate: remdate
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

    const handleSelect = (selectedList, selectedItem) => {

    }

    const handleRemove = (selectedList, selectedItem) => {

    }

    useEffect(() => {
        if(!jwtToken) {
            navigate('/login')
        }else {
            async function fetchBadges() {
                try {
                    const fetchedBadges = await axios.get(
                        `${process.env.REACT_APP_SERVER_HOSTNAME}/badges`,
                        { headers: { Authorization: `JWT ${jwtToken}` } }
                    )
                    if (fetchedBadges.data.status) {
                        setError(fetchedBadges.data.status)
                    } else {
                        setOptions(fetchedBadges.data.badges.map(val => ({text: val.text, id: val._id.toString()})))
                        setError('')
                    }
                } catch (err) {
                    setError('Something went wrong when fetching badges. Please try again later.')
                    console.log(err)
                    // nav('/login')
                }
            }
            fetchBadges()
        }
         
    }, [jwtToken])

    return (
        <>
            <h1>New Task</h1>
            <form method="POST" onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Name of Task:</label>
                    <br />
                    <input className="taskInputBox" type="text" onChange={e => setName(e.target.value)} />
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
                    <label>Status:</label>
                    <br />
                    <input className="taskInputBox" type="text" onChange={e => setstatus(e.target.value)} />
                </div>
                <Multiselect 
                    options={options} // Options to display in the dropdown
                    onSelect={handleSelect} // Function will trigger on select event
                    onRemove={handleRemove} // Function will trigger on remove event
                    displayValue="text"
                />
                <div>
                    <button className="submitButton" type="submit">Submit Task</button>
                </div>
            </form>
        </>
    )
}

export default NewTask
