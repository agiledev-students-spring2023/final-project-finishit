import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import './Reset.css';


const ConfirmU = props => {
    const [newUsername, setNewUsername] = useState('');
    const [confirmNewUsername, setConfirmNewUsername] = useState('');

    const handleNewUsernameChange = event => {
      setNewUsername(event.target.value);
    };

    const handleConfirmNewUsernameChange = event => {
        setConfirmNewUsername(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        // You can add your own logic to verify the new username here
        console.log(`New username: ${newUsername}`);
        // Redirect the user to the profile page
        window.location.href = '/profile';
    };

  return (
    <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h1>Change Username</h1>
        <br></br>
        <br></br>
        <form onSubmit={handleSubmit}>
            <label>
                <input class="inputBox" type="text" placeholder="New Username" value={newUsername} onChange={handleNewUsernameChange} />
            </label>
            <br />
            <br></br>
            <br></br>
            <label>
                <input class="inputBox" type="text" placeholder="Confirm New Username" value={confirmNewUsername} onChange={handleConfirmNewUsernameChange} />
            </label>
            <br />
            <br></br>
            <br></br>
            <Link to="/Login">
                <button CLASS="submitButton" type="submit">Confirm Changes</button>
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



export default ConfirmU