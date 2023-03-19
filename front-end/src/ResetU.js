import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import './Reset.css';


const ResetU = props => {

    const [password, setPassword] = useState('');

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        // You can add your own logic to verify the user's identity here
        console.log(`Password: ${password}`);
        // Redirect the user to the username reset page
        window.location.href = '/reset-username';
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
                    <input class="inputBox" type="text" placeholder="Password" value={password} onChange={handlePasswordChange} />
                </label>
                <br></br>
                <br></br>
                <Link to="/ConfirmU">
                    <button CLASS="submitButton" type="submit">Verify Password</button>
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

export default ResetU