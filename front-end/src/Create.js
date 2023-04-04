import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import './Create.css'

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
        console.log(`Username: ${username} Password: ${password} Pet Name: ${petName} Mother Maiden Name: ${motherMaidenName}`)
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
