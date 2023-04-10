import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import './Reset.css'

const Reset = props => {
    const [username, setUsername] = useState('')
    const [petName, setPetName] = useState('')
    const [motherMaidenName, setMotherMaidenName] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        // Perform validation and password reset logic here
    }

    return (
        <div>
            <h1>Trouble Logging In? Verify your Identity</h1>
            <form onSubmit={handleSubmit}>
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
                    <input className="inputReset" type="text" placeholder="What is your mother's maiden name?" value={motherMaidenName} onChange={e => setMotherMaidenName(e.target.value)} />
                </label>
                <br />
                <br />
                <Link to="/ConfirmP">
                    <button className="submitButton" type="submit">Verify Information</button>
                </Link>
                <p>OR</p>
                <p><Link class="loginText" to="/create">Create new account</Link></p>
                <p><Link class="loginText" to="/login">Back to login</Link></p>
            </form>
        </div>
    )
}

export default Reset
