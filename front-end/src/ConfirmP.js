import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import './ConfirmP.css'
import axios from 'axios'

const ConfirmP = props => {
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const navigate = useNavigate()

    const handleNewPasswordChange = event => {
        setNewPassword(event.target.value)
    }

    const handleConfirmNewPasswordChange = event => {
        setConfirmNewPassword(event.target.value)
    }

    const handleSubmit = async event => {
        event.preventDefault()
        if (!newPassword === confirmNewPassword) {
            alert('Passwords must match!')
            return
        }

        const payload = {
            username: localStorage.getItem('username'),
            newPassword
        }

        try {
            const response = await axios.patch(
                'http://localhost:5002/auth/reset-password',
                payload
            )

            navigate('/login')
        } catch (err) {
            alert(err.message)
        }
        // window.location.href = '/profile';
    }

    return (
        <div>
            <h1>Change Password</h1>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
                <label>
                    <input className="inputConfirm" type="password" placeholder="New Password" value={newPassword} onChange={handleNewPasswordChange} />
                </label>
                <br />
                <br />
                <br />
                <label>
                    <input className="inputConfirm" type="password" placeholder="Confirm New Password" value={confirmNewPassword} onChange={handleConfirmNewPasswordChange} />
                </label>
                <br />
                <br />
                <br />
                <button className="submitButton" type="submit">Confirm Changes</button>
                <br />
                <br />
                <p>OR</p>
                <p><Link class="loginText" to="/create">Create new account</Link></p>
                <p><Link class="loginText" to="/login">Back to login</Link></p>
            </form>
        </div>
    )
}

export default ConfirmP
