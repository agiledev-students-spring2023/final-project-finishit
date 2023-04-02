import React, { useState } from 'react'
import './Settings.css'

const Settings = props => {
    const [currentUsername, setCurrentUsername] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [confirmNewUsername, setConfirmNewUsername] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

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

    const handleConfirmChanges = () => {
        // Check if new username and confirm new username match
        if (newUsername !== confirmNewUsername) {
            alert('New username and confirm new username do not match')
            return
        }

        // Check if new password and confirm new password match
        if (newPassword !== confirmNewPassword) {
            alert('New password and confirm new password do not match')
            return
        }

        // Make API call to update user information
        // ...

        alert('Changes have been saved')
    }

    const handleDeleteAccount = () => {
        // Make API call to delete user account
        // ...

        alert('Account has been deleted')
    }

    return (
        <div>
            <h1>Settings</h1>
            <form>
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
                <button type="submit" className="submitButton" onClick={handleConfirmChanges}>Confirm Changes</button>
                <br />
                <br />
                <button type="submit" className="submitButton" onClick={handleDeleteAccount}>Delete Account</button>
            </form>
        </div>
    )
}

export default Settings
