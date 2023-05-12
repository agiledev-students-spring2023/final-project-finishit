/* eslint-disable no-underscore-dangle */
import './Task.css'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Task = props => {
    const jwtToken = localStorage.getItem('token')

    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault() // prevent the default browser form submission stuff
        axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/updatetaskstatus/${props.task._id}`, {}, {
            headers: { Authorization: `JWT ${jwtToken}` }
        }).then(response => {
            // Success
            window.location.reload(false)
        }).catch(err => {
            // Failure
        })
    }

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
    const dueDateFmt = new Date(dueDate)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const checkDate = date => {
        const now = new Date()
        const timezoneOffset = now.getTimezoneOffset() // in minutes
        const localDate = new Date(date.getTime() + (timezoneOffset * 60 * 1000))
        return (localDate < now ? 'overdue' : '')
    }

    const checkCompletionStatus = status1 => (status1 === 'COMPLETED' ? 'completedButton' : '')

    const getButtonText = status2 => {
        switch (status2) {
        case 'NOT_STARTED':
            return 'Start Task'
        case 'IN_PROGRESS':
            return 'Finish Task'
        case 'COMPLETED':
            return 'Completed'
        default:
            return 'Unknown!'
        }
    }

    return (
        <div className={`task-container ${checkDate(dueDateFmt)}`}>
            <div className="task-info">
                <Link to={`/edittask/${props.task._id}`}>
                    <div className="task-title-due-date">
                        <div className="task-title">{title}</div>
                        <div className="task-due-date">{`${months[dueDateFmt.getUTCMonth()]} ${dueDateFmt.getUTCDate()}, ${dueDateFmt.getUTCFullYear()}`}</div>
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
                <button
                    className={`categoryButton ${checkCompletionStatus(status)}`}
                    type="submit"
                    onClick={handleSubmit}
                >
                    {getButtonText(status)}
                </button>
            </div>
        </div>
    )
}

export default Task
