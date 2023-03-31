import './EditTask.css'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const EditTask = props => {
    const [date, setDate] = useState('')
    const dateInputRef = useRef(null)
    const handleChange = e => {
        setDate(e.target.value)
    }
    return (
        <>
            <h1>Task</h1>
            <form>
                <div>
                    <label>Name of Task:</label>
                    <br />
                    <input className="inputBox3" type="text" value="Job applications" />
                </div>

                <div>
                    <label>Reminder Date:</label>
                    <br />
                    <input type="date" onChange={handleChange} ref={dateInputRef} />
                </div>
                <div>
                    <label>Due Date:</label>
                    <br />
                    <input type="date" onChange={handleChange} ref={dateInputRef} />
                </div>

                <div>
                    <Link to="/"><button className="submitButton" type="submit">Edit Task</button></Link>
                </div>

                <div>
                    <Link to="/"><button className="submitButton deleteButton" type="submit">Delete Task</button></Link>
                </div>
            </form>
        </>
    )
}

export default EditTask
