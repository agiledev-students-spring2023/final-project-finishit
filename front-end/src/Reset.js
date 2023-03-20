import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import './Reset.css';



const Reset = props => {
  const [username, setUsername] = useState('');
  const [petName, setPetName] = useState('');
  const [motherMaidenName, setMotherMaidenName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation and password reset logic here
  }

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1>Trouble Logging In? Verify your Identity</h1>
      <br></br>
      <br></br>
      <form onSubmit={handleSubmit}>
        <label>
          <input class="inputBox" type="text" placeholder="Current Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br></br>
        <br></br>
        <label>
          <input class="inputBox" type="text" placeholder="What is the name of your first pet?" value={petName} onChange={(e) => setPetName(e.target.value)} />
        </label>
        <br></br>
        <br></br>
        <label>
          <input class="inputBox" type="text" placeholder="What is your mother's maiden name?" value={motherMaidenName} onChange={(e) => setMotherMaidenName(e.target.value)} />
        </label>
        <br></br>
        <br></br>
        <Link to="/ConfirmP">
            <button CLASS="submitButton" type="submit">Verify Information</button>
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

export default Reset
