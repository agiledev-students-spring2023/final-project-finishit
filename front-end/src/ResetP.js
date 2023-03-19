import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import './Reset.css';


const ResetP = props => {

    const [username, setUsername] = useState('');

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        // You can add your own logic to verify the user's identity here
        console.log(`Username: ${username}`);
        // Redirect the user to the password reset page
        window.location.href = '/reset-password';
    }

  return (
    <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h1>Trouble Logging In?</h1>
        <br></br>
        <br></br>
        <form onSubmit={handleSubmit}>
            <label>
                <input class="inputBox" type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
            </label>
            <br></br>
            <br></br>
            <Link to="/ConfirmP">
                <button CLASS="submitButton" type="submit">Verify Username</button>
            </Link>
            <br></br>
            <br></br>
            <p>OR</p>
            <p><Link class="loginText" to="/create">Create new account</Link></p>
            <p><Link class="loginText" to="/login">Back to login</Link></p>
        </form>
    </div>
  );    
}

export default ResetP