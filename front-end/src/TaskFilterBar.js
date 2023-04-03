import React from 'react'
import './TaskFilterBar.css'

const TaskFilterBar = props => {
    const checkStatusFilter = status => (status === props.statusFilter ? 'active' : '')
    const setStatusFilter = props.setStatusFilter

    return (
        <div className="task-filter-bar">
            <div
                role="button"
                tabIndex="0"
                className={`task-filter-button ${checkStatusFilter('NOT_STARTED')}`}
                onClick={() => setStatusFilter('NOT_STARTED')}
                onKeyDown={() => setStatusFilter('NOT_STARTED')}
            >
                Not Started
            </div>
            <div
                role="button"
                tabIndex="0"
                className={`task-filter-button ${checkStatusFilter('IN_PROGRESS')}`}
                onClick={() => setStatusFilter('IN_PROGRESS')}
                onKeyDown={() => setStatusFilter('IN_PROGRESS')}
            >
                In Progress
            </div>
            <div
                role="button"
                tabIndex="0"
                className={`task-filter-button ${checkStatusFilter('COMPLETED')}`}
                onClick={() => setStatusFilter('COMPLETED')}
                onKeyDown={() => setStatusFilter('COMPLETED')}
            >
                Completed
            </div>
        </div>
    )
}

export default TaskFilterBar
