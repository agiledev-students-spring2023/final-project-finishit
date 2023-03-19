import './Home.css'
import React, { useState } from 'react'
import Task from './Task'
import TaskFilterBar from './TaskFilterBar'

const daysAgo = days => {
    var d = new Date()
    d.setDate(d.getDate()+days)
    return d
}

const Home = props => {
    const dummyTasks = [
        { id: 1, title: 'Task 1', dueDate: daysAgo(-1), status: 'NOT_STARTED', badges: [{color: '#000000', text: 'Category 1'}, {color: '#ff0000', text: 'Category 3'}] },
        { id: 2, title: 'Task 2', dueDate: daysAgo(0), status: 'IN_PROGRESS', badges: [{color: '#ffffff', text: 'Category 2'}] },
        { id: 3, title: 'Task 3', dueDate: daysAgo(1), status: 'COMPLETED', badges: [{color: '#ccff99', text: 'Category 4'}] },
        { id: 4, title: 'Task 4', dueDate: daysAgo(2), status: 'NOT_STARTED', badges: [{color: '#000000', text: 'Category 1'}] },
        { id: 5, title: 'Task 5', dueDate: daysAgo(3), status: 'IN_PROGRESS', badges: [{color: '#ff0000', text: 'Category 3'}] },
        { id: 6, title: 'Task 6', dueDate: daysAgo(4), status: 'COMPLETED', badges: [{color: '#000000', text: 'Category 1'}] },
        { id: 7, title: 'Task 7', dueDate: daysAgo(5), status: 'NOT_STARTED', badges: [{color: '#ffffff', text: 'Category 2'}] },
        { id: 8, title: 'Task 8', dueDate: daysAgo(6), status: 'IN_PROGRESS', badges: [{color: '#ffffff', text: 'Category 2'}] },
        { id: 9, title: 'Task 9', dueDate: daysAgo(7), status: 'COMPLETED', badges: [{color: '#ffffff', text: 'Category 2'}] },
        { id: 10, title: 'Task 10', dueDate: daysAgo(8), status: 'NOT_STARTED', badges: [{color: '#000000', text: 'Category 1'}] },
    ]

    const [tasks] = useState(dummyTasks)
    const [statusFilter, setStatusFilter] = useState("NOT_STARTED")
    const filteredTasks = tasks.filter(task => task.status === statusFilter)

    return (
        <div>
            <div className="task-list">
                {filteredTasks.map((task, idx) => (
                    <React.Fragment key={idx}>
                        <Task key={task.id} task={task} />
                        {idx < filteredTasks.length-1 && <hr className="task-separator" />}
                    </React.Fragment>
                    
                ))}

                

            </div>
            <TaskFilterBar statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
        </div>
    )
}

export default Home