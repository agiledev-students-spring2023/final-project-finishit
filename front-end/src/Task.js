import "./Task.css"

const Task = props => {
    const { title, dueDate, status } = props.task
    const today = new Date()

    const checkDate = date => date < today ? "overdue" : ""

    return (
        <div class={`task-container ${checkDate(dueDate)}`}>
            <div class="task-info">
                <div class="task-title">{title}</div>
                <div class="task-due-date">{dueDate.toLocaleString()}</div>
                <div class="task-categories">
                    <span class="badge" style={{color: 'white', background: 'black'} /* todo: change style per category */}>Test 1</span>
                </div>
            </div>
            <div class="task-checkbox">
                <input type="checkbox" class="task-checkbox-input" checked={status === "COMPLETED"} />
            </div>
        </div>
    )
}

export default Task