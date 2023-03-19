import './TaskFilterBar.css'

const TaskFilterBar = props => {
    const { statusFilter, setStatusFilter } = props

    const checkStatusFilter = status => status === statusFilter ? "active" : ""
  
    return (
        <div className="task-filter-bar">
            <div
                className={`task-filter-button ${checkStatusFilter("NOT_STARTED")}`}
                onClick={() => setStatusFilter("NOT_STARTED")}
            >
                Not Started
            </div>
            <div
                className={`task-filter-button ${checkStatusFilter("IN_PROGRESS")}`}
                onClick={() => setStatusFilter("IN_PROGRESS")}
            >
                In Progress
            </div>
            <div
                className={`task-filter-button ${checkStatusFilter("COMPLETED")}`}
                onClick={() => setStatusFilter("COMPLETED")}
            >
                Completed
            </div>
        </div>
    )
}

export default TaskFilterBar