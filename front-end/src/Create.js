import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Create.css'
import axios from 'axios'
import FormMessage from './FormMessage'

const Create = props => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [petName, setPetName] = useState('')
    const [motherMaidenName, setMotherMaidenName] = useState('')
    const [error, setError] = useState(undefined)
    const navigate = useNavigate()

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
                .then(response1 => {
                    console.log(`Received server response: ${response1.data}`)
                    if (response1.data.success) {
                        navigate('/login')
                    } else if (response1.data.status) {
                        setError({ class: 'error', text: response1.data.status })
                    }
                    // navigate('/')
                })
                .catch(err => {
                    // failure
                    setError({ class: 'error', text: 'Something went wrong. Please try again later.' })
                    console.log(`Received server error: ${err}`)
                    if (err.response1 && err.response1.status === 401) {
                        navigate('/')
                    }
                })
            console.log('response', response)
            // window.location = '/login'
        } catch (error2) {
            console.error(error2)
        }
    }

    return (
        <div>
            <br />
            {error && (
                <FormMessage text={error.text} class={error.class} />
            )}
            <h1>Create New Account</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <input className="inputCreate" type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
                </label>
                <br />
                <br />
                <label>
                    <input className="inputCreate" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <br />
                <label>
                    <input className="inputCreate" type="text" placeholder="What is the name of your first pet?" value={petName} onChange={handlePetNameChange} />
                </label>
                <br />
                <br />
                <label>
                    <input className="inputCreate" type="text" placeholder="What is your mother's maiden name?" value={motherMaidenName} onChange={handleMotherMaidenNameChange} />
                </label>
                <br />
                <br />
                <br />
                <button className="submitButton" type="submit">Create Account</button>
                <br />
                <br />
                <p>
                    Already have an account?
                    <Link className="loginText" to="/login"> Log in</Link>
                </p>
            </form>
        </div>
    )
}

export default Create
