import './NewTask.css'
import React from 'react'

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
            </form>

        </>

    )

}

export default NewTask;