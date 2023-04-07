import { Link, navigate, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import './Create.css'
import axios from 'axios'

const Create = props => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [petName, setPetName] = useState('')
    const [motherMaidenName, setMotherMaidenName] = useState('')

    const handleUsernameChange = event => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value)
    }

    const handlePetNameChange = event => {
        setPetName(event.target.value)
    }

    const handleMotherMaidenNameChange = event => {
        setMotherMaidenName(event.target.value)
    }

    const handleSubmit = async event => {
        event.preventDefault()
        const payload = {
            username,
            password,
            petName,
            motherName: motherMaidenName
        }

        console.log('payload', payload)

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/auth/create`, payload)
            console.log('response', response)
            navigate('/login')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h1>Create New Account</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <input className="inputBox3" type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
                </label>
                <br />
                <br />
                <label>
                    <input className="inputBox3" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <br />
                <label>
                    <input className="inputBox3" type="text" placeholder="What is the name of your first pet?" value={petName} onChange={handlePetNameChange} />
                </label>
                <br />
                <br />
                <label>
                    <input className="inputBox3" type="text" placeholder="What is your mother's maiden name?" value={motherMaidenName} onChange={handleMotherMaidenNameChange} />
                </label>
                <br />
                <br />
                <br />
                <button className="submitButton" type="submit">Create Account</button>
                <br />
                <br />
                <p>
                    Already have an account?
                    <Link className="loginText" to="/login">Log in</Link>
                </p>
            </form>
        </div>
    )
}

export default Create
