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

    const sampleBadges = [
        { id: 0, color: '#000000', text: 'Category 1' },
        { id: 1, color: '#ffffff', text: 'Category 2' },
        { id: 2, color: '#ff0000', text: 'Category 3' },
        { id: 3, color: '#ccff99', text: 'Category 4' },
        { id: 4, color: '#ff0000', text: 'Urgent' },
        { id: 5, color: '#f5b942', text: 'Medium Priority' }
    ]

    const nav = useNavigate()

    const [badges, setBadges] = useState([])
    /*
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
*/
    useEffect(() => {
        async function fetchBadges() {
            const jwtToken = localStorage.getItem('token')
            if (!jwtToken) {
                console.log('No token')
                nav('/login')
            } else {
                try {
                    const fetchedBadges = await axios.get(
                        `${process.env.REACT_APP_SERVER_HOSTNAME}/auth/userInfo`,
                        { headers: { Authorization: `JWT ${jwtToken}` } }
                    )
                    setBadges(fetchedBadges.data.badges)
                } catch (err) {
                    console.log('Something went wrong when fetching badges')
                    console.log(err)
                    nav('/login')
                }
            }
        }

        // fetch badges this once
        fetchBadges()
        /*
        // set a timer to load data from server every n seconds
        const intervalHandle = setInterval(() => {
            fetchBadges()
        }, 5000)

        // return a function that will be called when this component unloads
        return e => {
            // clear the timer, so we don't still load badges when this component is not loaded
            clearInterval(intervalHandle)
        } */
    }, [nav])

    return (
        <div className="pagebody">
            <Link className="loginText" to="/newbadge">Click here to create a new badge</Link>
            {' '}
            or click on an existing badge to edit it.
            <br />
            <br />
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
