import './BadgeHome.css'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const BadgeHome = props => {
    const textColorFromBackground = background => {
        const hexToRGB = hex => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
            return result
                ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null
        }

        const rgb = hexToRGB(background)
        return (rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114) > 154 ? 'black' : 'white'
    }

    const sampleBadges = [
        { color: '#000000', text: 'Category 1' },
        { color: '#ffffff', text: 'Category 2' },
        { color: '#ff0000', text: 'Category 3' },
        { color: '#ccff99', text: 'Category 4' },
        { color: '#ff0000', text: 'Urgent' },
        { color: '#f5b942', text: 'Medium Priority' }
    ]

    const [badges, setBadges] = useState(sampleBadges)

    const fetchBadges = () => {
        //    env var in .env
        axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/badges`)// returns a promise
            .then(response => {
                setBadges(response.data.badges)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        // fetch badges this once
        fetchBadges()

        // set a timer to load data from server every n seconds
        const intervalHandle = setInterval(() => {
            fetchBadges()
        }, 5000)

        // return a function that will be called when this component unloads
        return e => {
            // clear the timer, so we don't still load badges when this component is not loaded
            clearInterval(intervalHandle)
        }
    }, [])

    return (
        <div className="pagebody">
            <Link className="loginText" to="/newbadge">Click here to create a new badge</Link>
            {' '}
            or click on an existing badge to edit it.
            <br />
            <br />
            {badges.map((badge, idx) => (
                <React.Fragment key={idx}>
                    <Link to="/editbadge">
                        <span key={idx} className="badge" style={{ color: textColorFromBackground(badge.color), background: badge.color }}>{badge.text}</span>
                    </Link>
                </React.Fragment>
            ))}
        </div>
    )
}

export default BadgeHome
