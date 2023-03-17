import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import './Create.css';

const Create = props => {
const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    console.log(`Username: ${username} Password: ${password}`);
  }

  return (
    <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h1>Create New Account</h1>
        <br></br>
        <br></br>
        <form onSubmit={handleSubmit}>
            <label>
                <input class="inputBox" type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
            </label>
            <br />
            <br></br>
            <br></br>
            <label>
                <input class="inputBox" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
            </label>
            <br />
            <br></br>
            <br></br>
            <button CLASS="submitButton" type="submit">Create Account</button>
            <br></br>
            <br></br>
            <p>Already have an account? <Link class="loginText" to="/login">Log in</Link></p>
        </form>
    </div>
  );    
}
  
export default Create