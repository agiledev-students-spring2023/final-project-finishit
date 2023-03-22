import './NewTask.css'
import React, {useRef, useState} from 'react'
import { Link } from 'react-router-dom';


const NewTask = (props) => {

    const [date, setDate] = useState('');
    const dateInputRef = useRef(null);

    const handleChange = (e) => {

        setDate(e.target.value);


    };

    return (
        <>
            <h1>New Task</h1>

            <form>
                <div>
                    <label>Name of Task:</label><br />
                    <input className="taskInputBox" type="text"></input>
                </div>

                <div>
                    <label >Reminder Date:</label><br />
                    <input type="date" onChange={handleChange} ref={dateInputRef}/>
                    
                </div>
 
                <div>
                    <label >Due Date:</label><br />
                    <input type="date" onChange={handleChange} ref={dateInputRef}/>
                </div>

                <div>
                    <Link to="/"><button className="submitButton">Submit Task</button></Link>
                </div>
            </form>

        </>

    )

}

export default NewTask;