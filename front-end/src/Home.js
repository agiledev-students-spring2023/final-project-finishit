import './Home.css'
import React, { useState } from 'react'
import Task from './Task'
import TaskFilterBar from './TaskFilterBar'

const Home = props => {
    const dummyTasks = [
        { id: 1, title: 'Task 1', dueDate: '2023-03-05', status: 'NOT_STARTED' },
        { id: 2, title: 'Task 2', dueDate: '2023-03-06', status: 'IN_PROGRESS' },
        { id: 3, title: 'Task 3', dueDate: '2023-03-07', status: 'COMPLETED' },
        { id: 4, title: 'Task 4', dueDate: '2023-03-08', status: 'NOT_STARTED' },
        { id: 5, title: 'Task 5', dueDate: '2023-03-09', status: 'IN_PROGRESS' },
        { id: 6, title: 'Task 6', dueDate: '2023-03-10', status: 'COMPLETED' },
        { id: 7, title: 'Task 7', dueDate: '2023-03-11', status: 'NOT_STARTED' },
        { id: 8, title: 'Task 8', dueDate: '2023-03-12', status: 'IN_PROGRESS' },
        { id: 9, title: 'Task 9', dueDate: '2023-03-13', status: 'COMPLETED' },
        { id: 10, title: 'Task 10', dueDate: '2023-03-14', status: 'NOT_STARTED' },
    ]

    const [tasks] = useState(dummyTasks)
    const [statusFilter, setStatusFilter] = useState("NOT_STARTED")
    const filteredTasks = tasks.filter(task => task.status === statusFilter)

    return (
        <div>
            <div class="task-list">
                {filteredTasks.map((task, idx) => (
                    <React.Fragment key={idx}>
                        <Task key={task.id} task={task} />
                        {idx < filteredTasks.length-1 && <hr class="task-separator" />}
                    </React.Fragment>
                ))}
            </div>
            <TaskFilterBar statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
        </div>
    )
}

// make this component available to be imported into any other file
export default Home