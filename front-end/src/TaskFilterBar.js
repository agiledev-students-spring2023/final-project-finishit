import React from 'react'
import './TaskFilterBar.css'

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

const TaskFilterBar = props => {
    const checkStatusFilter = status => (status === props.statusFilter ? 'active' : '')
    const setStatusFilter = props.setStatusFilter

    return (
        <div className="bottombar">
            <div className="task-badge-filter-bar">
                {props.badgeFilter != null ? (
                    <>
                        Currently filtering by:
                        <span
                            className="badge"
                            style={{
                                color: textColorFromBackground(props.badgeFilter.color),
                                background: props.badgeFilter.color,
                                marginLeft: '8px'
                            }}
                        >
                            {props.badgeFilter.text}
                        </span>
                        <button type="button" onClick={() => props.setBadgeFilter(null)}>Click to Clear</button>
                    </>
                ) : 'Click on a task badge to filter by that badge.'}
            </div>
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
                <div
                    role="button"
                    tabIndex="0"
                    className={`task-filter-button ${checkStatusFilter(null)}`}
                    onClick={() => setStatusFilter(null)}
                    onKeyDown={() => setStatusFilter(null)}
                >
                    All Tasks
                </div>
            </div>
        </div>
    )
}

export default TaskFilterBar
