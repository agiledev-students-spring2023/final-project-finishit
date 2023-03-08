import './NewTask.css'
import React from 'react'

const NewTask = (props) => {

    return (
        <>
            <h1>New Task</h1>

            <form>
                <div>
                    <label >Reminder Date:</label>
                    <input type="text"></input>
                </div>
                
                <div>
                    <label >Name of task:</label>
                    <input type="text"></input>
                </div>
 
                <div>
                    <label >Due Date:</label>
                    <input type="text"></input>
                </div>
            </form>

        </>

    )

}

export default NewTask;