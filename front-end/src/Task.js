import './Task.css'
import React from 'react'
import { Link } from 'react-router-dom'

const Task = props => {
    const textColorFromBackground = background => {
        const hexToRGB = hex => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
            return result ? [
                parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)
            ] : null
        }

        const rgb = hexToRGB(background)
        return (rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114) > 150 ? 'black' : 'white'
    }

    const { title, dueDate, status, badges } = props.task
    const today = new Date()

    const checkDate = date => (date < today ? 'overdue' : '')

    return (
        <div className={`task-container ${checkDate(dueDate)}`}>
            <div className="task-info">
                <Link to="/edittask">
                    <div className="task-title-due-date">
                        <div className="task-title">{title}</div>
                        <div className="task-due-date">{dueDate.toLocaleString()}</div>
                    </div>
                </Link>
                <div className="task-categories">
                    {badges.map((badge, idx) => (
                        <React.Fragment key={idx}>
                            <span
                                key={idx}
                                role="button"
                                tabIndex="0"
                                className="badge"
                                style={{
                                    color: textColorFromBackground(badge.color),
                                    background: badge.color
                                }}
                                onClick={() => props.badgeFilterFunction(badge)}
                                onKeyDown={() => props.badgeFilterFunction(badge)}
                            >
                                {badge.text}
                            </span>
                        </React.Fragment>

                    ))}
                </div>
            </div>
            <div className="task-checkbox">
                <input type="checkbox" className="task-checkbox-input" defaultChecked={status === 'COMPLETED'} />
            </div>

        </div>
    )
}

export default Task
