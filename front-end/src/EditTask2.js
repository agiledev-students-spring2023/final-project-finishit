import './EditTask.css'
import React from 'react'
import { Link } from 'react-router-dom';

const EditTask = (props) => {

    return (
        <>
            <h1>Task</h1>

            <form>
                <div>
                    <label >Reminder Date:</label><br />
                    <input type="text" value={"3/11/2023"}></input>
                </div>
                
                <div>
                    <label >Name of Task:</label><br />
                    <input type="text" value={"Job applications"}></input>
                </div>
 
                <div>
                    <label >Due Date:</label><br />
                    <input type="text" value={"3/13/2023"}></input>
                </div>

                <div>
                    <Link to="/"><button className="submitButton">Edit Task</button></Link>
                </div>

               
            </form>

        </>

    )

}

export default EditTask;