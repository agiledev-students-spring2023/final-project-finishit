import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import './Reset.css';


const ConfirmP = props => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleNewPasswordChange = event => {
        setNewPassword(event.target.value);
    };

    const handleConfirmNewPasswordChange = event => {
        setConfirmNewPassword(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.log(`New password: ${newPassword}`);
        //window.location.href = '/profile';
    };

  return (
    <div>
        <h1>Change Password</h1>
        <br></br>
        <br></br>
        <form onSubmit={handleSubmit}>
            <label>
                <input class="inputBox" type="password" placeholder="New Password" value={newPassword} onChange={handleNewPasswordChange} />
            </label>
            <br />
            <br></br>
            <br></br>
            <label>
                <input class="inputBox" type="password" placeholder="Confirm New Password" value={confirmNewPassword} onChange={handleConfirmNewPasswordChange} />
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



export default ConfirmP