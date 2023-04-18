import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Reset.css'

const Reset = props => {
    const [username, setUsername] = useState('')
    const [petName, setPetName] = useState('')
    const [motherMaidenName, setMotherMaidenName] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        // Perform validation and password reset logic here
        const payload = {
            username,
            answers: {
                petName,
                motherName: motherMaidenName
            }
        }

        try {
            const response = await axios.post(
                'http://localhost:5002/auth/verify-answers',
                payload
            )

            localStorage.setItem('username', response.data.username)
            navigate('/confirmp')
        } catch (err) {
            alert(err.message)
        }
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
                <button className="submitButton" type="submit">Verify Information</button>
                <p>OR</p>
                <p><Link className="loginText" to="/create">Create new account</Link></p>
                <p><Link className="loginText" to="/login">Back to login</Link></p>
            </form>
        </div>
    )
}

export default Reset
