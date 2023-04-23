import './BadgeHome.css'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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

    const nav = useNavigate()

    const [badges, setBadges] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchBadges() {
            const jwtToken = localStorage.getItem('token')
            if (!jwtToken) {
                console.log('No token')
                nav('/login')
            } else {
                try {
                    const fetchedBadges = await axios.get(
                        `${process.env.REACT_APP_SERVER_HOSTNAME}/badges`,
                        { headers: { Authorization: `JWT ${jwtToken}` } }
                    )
                    if (fetchedBadges.data.status) {
                        setError(fetchedBadges.data.status)
                    } else {
                        setBadges(fetchedBadges.data.badges)
                        setError('')
                    }
                } catch (err) {
                    setError('Something went wrong when fetching badges. Please try again later.')
                    console.log(err)
                }
            }
        }

        fetchBadges()
    }, [nav])

    return (
        <div className="pagebody">
            <Link className="loginText" to="/newbadge">Click here to create a new badge</Link>
            {' '}
            or click on an existing badge to edit it.
            <br />
            <br />
            {error && (
                <p>
                    Error:
                    {' ' + error}
                </p>
            )}
            {badges && badges.map((badge, idx) => (
                <React.Fragment key={idx}>
                    <Link to={`/editbadge/${badge._id}`}>
                        <span key={idx} className="badge" style={{ color: textColorFromBackground(badge.color), background: badge.color }}>{badge.text}</span>
                    </Link>
                </React.Fragment>
            ))}
        </div>
    )
}

export default BadgeHome
