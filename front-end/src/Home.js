import './Home.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Task from './Task'
import TaskFilterBar from './TaskFilterBar'

const Home = props => {
    const jwtToken = localStorage.getItem('token')

    const [user, setUser] = useState(null)
    const [statusFilter, setStatusFilter] = useState(null)
    const [badgeFilter, setBadgeFilter] = useState(null)

    // Start with no tasks.
    const [tasks, setTasks] = useState([])

    // Effect to get the current user.
    useEffect(() => {
        if (jwtToken != null) {
            axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/auth/userInfo`, {
                headers: { Authorization: `JWT ${jwtToken}` }
            }).then(response => {
                setUser(response.data)
            })
        }
    }, [jwtToken])

    // Effect to load the user's tasks.
    useEffect(() => {
        const filterTasks = task => (
            (statusFilter === null || task.status === statusFilter)
            && (badgeFilter === null
                || task.badges
                    .filter(badge => badge._id.toString() === badgeFilter._id.toString()).length > 0
            )
        )

        const fetchTasks = () => {
            axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/tasks`, {
                headers: { Authorization: `JWT ${jwtToken}` }
            }).then(response => {
                setTasks(response.data.filter(filterTasks))
            }).catch(err => {
                console.log(err)
            })
        }

        // fetch tasks this once
        fetchTasks()

        // set a timer to load data from server every n seconds
        /* const intervalHandle = setInterval(() => {
            fetchTasks()
        }, 5000) */

        // return a function that will be called when this component unloads
        /* return e => {
            // clear the timer, so we don't still load tasks when this component is not loaded
            clearInterval(intervalHandle)
        } */
    }, [jwtToken, statusFilter, badgeFilter])

    /* if (!user) {
        window.location.href = '/login'
        return ''
    } */

    return (
        <div className="task-body">
            <div className="task-list">
                {tasks.length === 0 ? (
                    <div className="no-tasks">
                        No tasks match the current filters.
                        <br />
                        <br />
                        Add tasks or remove filters to view tasks.
                        <br />
                        <br />
                        Click the &quot;+&quot; on the top right to add tasks.
                    </div>
                ) : tasks.map((task, idx) => (
                    <React.Fragment key={idx}>
                        <Task key={task.id} task={task} badgeFilterFunction={setBadgeFilter} />
                        {idx < tasks.length - 1 && <hr className="task-separator" />}
                    </React.Fragment>
                ))}

            </div>
            <TaskFilterBar
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                badgeFilter={badgeFilter}
                setBadgeFilter={setBadgeFilter}
            />
        </div>
    )
}

export default Home
