import React, { useState } from 'react'
import './Settings.css'
import axios from 'axios'

const Settings = props => {
    const [currentUsername, setCurrentUsername] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [confirmNewUsername, setConfirmNewUsername] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const [showConfirm, setShowConfirm] = useState(false)

    const handleUsernameChange = e => {
        const { name, value } = e.target
        if (name === 'currentUsername') {
            setCurrentUsername(value)
        } else if (name === 'newUsername') {
            setNewUsername(value)
        } else if (name === 'confirmNewUsername') {
            setConfirmNewUsername(value)
        }
    }

    const handlePasswordChange = e => {
        const { name, value } = e.target
        if (name === 'currentPassword') {
            setCurrentPassword(value)
        } else if (name === 'newPassword') {
            setNewPassword(value)
        } else if (name === 'confirmNewPassword') {
            setConfirmNewPassword(value)
        }
    }

    const handleConformDialogue = () => {
        if (showConfirm) {
            setShowConfirm(false)
        } else {
            setShowConfirm(true)
        }
    }

    const handleDeleteAccount = async () => {
        // Make API call to delete user account
        // ...
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/auth/delete`, {
                method: 'POST',
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })
            const jsonResponse = await response.json()
            if (jsonResponse.success) {
                handleConformDialogue()
                alert('Account has been deleted')
                localStorage.clear()
                window.location.href = '/login'
            } else {
                alert('ERROR deleting account')
            }
        } catch (e) {
            alert(`ERROR: ${e.message}`)
        }
    }

    const submitHandler = async e => {
        e.preventDefault()

        if (newUsername !== confirmNewUsername) {
            alert('both usernames must match')
            return
        }
        if (newPassword !== confirmNewPassword) {
            alert('both passwords must match!')
            return
        }

        const paylaod = {
            username: newUsername,
            password: newPassword
        }

        console.log('payload in setting', paylaod)

        try {
            const response = await axios.put(
                `${process.env.REACT_APP_SERVER_HOSTNAME}/auth/`,
                paylaod,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            localStorage.clear()
            window.location = '/login'
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <div>
            <h1>Settings</h1>
            <form onSubmit={submitHandler}>
                <h2>Change Username</h2>
                <label>
                    <input className="inputBox5" type="text" name="currentUsername" placeholder="Current Username" value={currentUsername} onChange={handleUsernameChange} />
                </label>
                <br />
                <br />
                <label>
                    <input className="inputBox5" type="text" name="newUsername" placeholder="New Username" value={newUsername} onChange={handleUsernameChange} />
                </label>
                <br />
                <br />
                <label>
                    <input className="inputBox5" type="text" name="confirmNewUsername" placeholder="Confirm New Username" value={confirmNewUsername} onChange={handleUsernameChange} />
                </label>
                <br />
                <br />
                <h2>Change Password</h2>
                <label>
                    <input className="inputBox5" type="password" name="currentPassword" placeholder="Current Password" value={currentPassword} onChange={handlePasswordChange} />
                </label>
                <br />
                <br />
                <label>
                    <input className="inputBox5" type="password" name="newPassword" placeholder="New Password" value={newPassword} onChange={handlePasswordChange} />
                </label>
                <br />
                <br />
                <label>
                    <input className="inputBox5" type="password" name="confirmNewPassword" placeholder="Confirm New Password" value={confirmNewPassword} onChange={handlePasswordChange} />
                </label>
                <br />
                <br />
                <button type="submit" className="submitButton" onClick={submitHandler}>Confirm Changes</button>
                <br />
                <br />
                <button type="button" className="submitButton" onClick={handleConformDialogue}>Delete Account</button>
            </form>
            {showConfirm && (
                <div className="delete-confirm">
                    <div className="delete-confirm__content">
                        <h3 className="delete-confirm__title">Are you sure you want to delete your account?</h3>
                        <div className="delete-confirm__actions">
                            <button type="submit" className="btn btn--no" onClick={handleConformDialogue}>No</button>
                            <button type="submit" className="btn btn--yes btn-submit" onClick={handleDeleteAccount}>Yes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Settings
