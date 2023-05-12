import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import FormMessage from './FormMessage'
import './Settings.css'

const Settings = props => {
    const jwtToken = localStorage.getItem('token')

    const [currentUsername, setCurrentUsername] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [confirmNewUsername, setConfirmNewUsername] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const [formMessage, setFormMessage] = useState(null)

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

    const handleConfirmDialogue = () => {
        if (showConfirm) {
            setShowConfirm(false)
        } else {
            setShowConfirm(true)
        }
    }

    const navigate = useNavigate()

    const handleDeleteAccount = async () => {
        axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/auth/delete`, {
            headers: { Authorization: `JWT ${jwtToken}` }
        }).then(response => {
            handleConfirmDialogue()
            setFormMessage({ class: 'success', text: 'Successfully deleted account!' })
            localStorage.clear()
            navigate('/login')
        }).catch(err => {
            // failure
            setFormMessage({ class: 'error', text: 'Unable to delete your account.' })
        })
    }

    const submitHandler = async e => {
        e.preventDefault()

        let actionTaken = false

        if (newUsername !== '') {
            // Handle username change.
            if (newUsername !== confirmNewUsername) {
                setFormMessage({ class: 'error', text: 'Usernames do not match!' })
                return
            }

            // Attempt to change the username in the database.
            axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/auth/change/username`, {
                newUsername
            }, {
                headers: { Authorization: `JWT ${jwtToken}` }
            }).then(response => {
                if (response.data.success) {
                    setFormMessage({ class: 'success', text: 'Successfully changed username!' })
                } else if (response.data.status) {
                    setFormMessage({ class: 'error', text: response.data.status })
                }
            }).catch(err => {
                // failure
                setFormMessage({ class: 'error', text: 'Unable to change your username.' })
            })

            actionTaken = true
        }

        if (newPassword !== '') {
            // Handle password change.
            if (newPassword !== confirmNewPassword) {
                setFormMessage({ class: 'error', text: 'Passwords do not match!' })
                return
            }

            // Attempt to change the password in the database.
            axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/auth/change/password`, {
                newPassword
            }, {
                headers: { Authorization: `JWT ${jwtToken}` }
            }).then(response => {
                if (response.data.success) {
                    setFormMessage({ class: 'success', text: 'Successfully changed password!' })
                } else if (response.data.status) {
                    setFormMessage({ class: 'error', text: response.data.status })
                }
            }).catch(err => {
                // failure
                setFormMessage({ class: 'error', text: 'Unable to change your password.' })
            })

            actionTaken = true
        }

        if (!actionTaken) {
            setFormMessage({ class: 'error', text: 'New username and/or password required.' })
        }
    }

    return (
        <div>
            <h1>Settings</h1>
            {formMessage && <FormMessage text={formMessage.text} class={formMessage.class} /> }
            <form onSubmit={submitHandler}>
                <h2>Change Username</h2>
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
                <button type="button" className="deleteButton" onClick={handleConfirmDialogue}>Delete Account</button>
            </form>
            {showConfirm && (
                <div className="delete-confirm">
                    <div className="delete-confirm__content">
                        <h3 className="delete-confirm__title">Are you sure you want to delete your account?</h3>
                        <div className="delete-confirm__actions">
                            <button type="submit" className="btn btn--no" onClick={handleConfirmDialogue}>No</button>
                            <button type="submit" className="btn btn--yes btn-submit" onClick={handleDeleteAccount}>Yes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Settings
