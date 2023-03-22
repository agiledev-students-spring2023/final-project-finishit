import './EditTask.css'
import React, {useRef, useState} from 'react'
import { Link } from 'react-router-dom';

const EditTask = (props) => {

    const [date, setDate] = useState('');
    const dateInputRef = useRef(null);

    const handleChange = (e) => {

        setDate(e.target.value);


    };

    return (
        <>
            <h1>Task</h1>

            <form>
                <div>
                    <label >Name of Task:</label><br />
                    <input class="inputBox3" type="text" value={"Job applications"}></input>
                </div>

                <div>
                    <label >Reminder Date:</label><br />
                    <input type="date" onChange={handleChange} ref={dateInputRef} value={date} ></input>
                </div>
                
                <div>
                    <label >Due Date:</label><br />
                    <input type="date" onChange={handleChange} ref={dateInputRef} value={date}></input>
                </div>

                <div>
                    <Link to="/"><button className="submitButton">Edit Task</button></Link>
                </div>

               
            </form>

        </>

    )

}

export default EditTask;