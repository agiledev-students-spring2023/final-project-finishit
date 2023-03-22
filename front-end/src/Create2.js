import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import './Create.css';

const Create = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [petName, setPetName] = useState('');
    const [motherMaidenName, setMotherMaidenName] = useState('');

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    }

    const handlePetNameChange = event => {
        setPetName(event.target.value);
    }

    const handleMotherMaidenNameChange = event => {
        setMotherMaidenName(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log(`Username: ${username} Password: ${password} Pet Name: ${petName} Mother Maiden Name: ${motherMaidenName}`);
    }

    return (
        <div>
            <h1>Create New Account</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <input class="inputBox" type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
                </label>
                <br></br>
                <label>
                    <input class="inputBox" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                </label>
                <br></br>
                <label>
                    <input class="inputBox" type="text" placeholder="What is the name of your first pet?" value={petName} onChange={handlePetNameChange} />
                </label>
                <br></br>
                <label>
                    <input class="inputBox" type="text" placeholder="What is your mother's maiden name?" value={motherMaidenName} onChange={handleMotherMaidenNameChange} />
                </label>
                <br />
                <br></br>
                <br></br>
                <Link to="/Login">
                    <button CLASS="submitButton" type="submit">Create Account</button>
                </Link>
                <br></br>
                <br></br>
                <p>Already have an account? <Link class="loginText" to="/login">Log in</Link></p>
            </form>
        </div>
  );    
}
  
export default Create