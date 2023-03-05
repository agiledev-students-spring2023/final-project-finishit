import "./Task.css"

const Task = props => {
    const { title, dueDate, status } = props.task

    return (
        <div class="task-container">
            <div class="task-info">
                <div class="task-title">{title}</div>
                <div class="task-due-date">{dueDate}</div>
            </div>
            <div class="task-checkbox">
                <input type="checkbox" class="task-checkbox-input" checked={status === "COMPLETED"} />
            </div>
        </div>
    )
}

export default Task