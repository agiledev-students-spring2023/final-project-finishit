import './NewTask.css'
import React from 'react'
import { Link } from 'react-router-dom';

const NewTask = (props) => {

    return (
        <>
            <h1>New Task</h1>

            <form>
                <div>
                    <label >Reminder Date:</label><br />
                    <input type="text"></input>
                </div>
                
                <div>
                    <label >Name of Task:</label><br />
                    <input type="text"></input>
                </div>
 
                <div>
                    <label >Due Date:</label><br />
                    <input type="text"></input>
                </div>

                <div>
                    <Link to="/"><button>Submit Task</button></Link>
                </div>
            </form>

        </>

    )

}

export default NewTask;