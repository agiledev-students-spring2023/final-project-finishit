import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import FormMessage from './FormMessage'
import './Reset.css'

const Reset = props => {
    const [username, setUsername] = useState('')
    const [petName, setPetName] = useState('')
    const [motherName, setMotherName] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const [formMessage, setFormMessage] = useState(null)

    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()

        if (newPassword !== confirmNewPassword) {
            setFormMessage({ class: 'error', text: 'Passwords do not match!' })
            return
        }

        axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/auth/forgot`, {
            username, newPassword, petName, motherName
        }).then(response => {
            if (response.data.success) {
                setFormMessage({ class: 'success', text: 'Successfully changed your password!' })
                navigate('/login')
            } else if (response.data.status) {
                setFormMessage({ class: 'error', text: response.data.status })
            }
        }).catch(err => {
            // failure
            console.log(`Received server error: ${err}`)
            setFormMessage({ class: 'error', text: 'Not able to change password. User may not exist or security questions may not be correct.' })
        })
    }

    return (
        <div>
            <h1>
                Trouble Logging In?
                <br />
                Verify your Identity
            </h1>
            {formMessage && <FormMessage text={formMessage.text} class={formMessage.class} /> }
            <form onSubmit={handleSubmit}>
                <br />
                <label>
                    <input className="inputReset" type="text" placeholder="Current Username" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <br />
                <br />
                <label>
                    <input className="inputReset" type="text" placeholder="What is the name of your first pet?" value={petName} onChange={e => setPetName(e.target.value)} />
                </label>
                <br />
                <br />
                <label>
                    <input className="inputReset" type="text" placeholder="What is your mother's maiden name?" value={motherName} onChange={e => setMotherName(e.target.value)} />
                </label>
                <br />
                <br />
                <label>
                    <input className="inputReset" type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                </label>
                <br />
                <br />
                <label>
                    <input className="inputReset" type="password" placeholder="Confirm New Password" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />
                </label>
                <br />
                <br />
                <button className="submitButton" type="submit">Verify Information & Reset Password</button>
                <p>OR</p>
                <p><Link className="loginText" to="/create">Create new account</Link></p>
                <p><Link className="loginText" to="/login">Back to login</Link></p>
            </form>
        </div>
    )
}

export default Reset
