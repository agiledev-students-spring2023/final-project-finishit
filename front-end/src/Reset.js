import { Link } from 'react-router-dom'
import React, { useState } from 'react';
import './Reset.css';


const Reset = props => {
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
        <form>
            <p>Reset <Link class="loginText" to="/resetu">username</Link></p>
            <p>Reset <Link class="loginText" to="/resetp">password</Link></p>
            <br />
            <br></br>
            <br></br>
            <p>OR</p>
            <br></br>
            <br></br>
            <p><Link class="loginText" to="/create">Create new account</Link></p>
            <p><Link class="loginText" to="/login">Back to login</Link></p>
        </form>
    </div>
  );    
}



export default Reset