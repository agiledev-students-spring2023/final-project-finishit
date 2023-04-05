import { Link } from 'react-router-dom'
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

    const handleSubmit = event => {
        event.preventDefault()
        try {
            const response = axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/create`, { username, password, petName, motherMaidenName })
            const token = response.data.token
            localStorage.setItem('token', token)
            // redirect to protected route
            window.location = '/protected'
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
                <Link to="/Login">
                    <button className="submitButton" type="submit">Create Account</button>
                </Link>
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
