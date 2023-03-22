import './BadgeHome.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const BadgeHome = props => {
    const textColorFromBackground = background => {
        const hexToRGB = hex => {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
            return result ? [ parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16) ] : null
        }
    
        const rgb = hexToRGB(background)
        return (rgb[0]*0.299 + rgb[1]*0.587 + rgb[2]*0.114) > 154 ? 'black' : 'white'
    }

    const sampleBadges = [
        {color: '#000000', text: 'Category 1'},
        {color: '#ffffff', text: 'Category 2'},
        {color: '#ff0000', text: 'Category 3'},
        {color: '#ccff99', text: 'Category 4'},
        {color: '#ff0000', text: 'Urgent'},
        {color: '#f5b942', text: 'Medium Priority'}
    ]

    const [badges] = useState(sampleBadges)

    return (
        <div className="pagebody">
            <Link className="loginText" to="/newbadge">Click here to create a new badge</Link> or click on an existing badge to edit it.
            <br/><br/>
            {badges.map((badge, idx) => (
                <React.Fragment key={idx}>
                    <Link to="/editbadge">
                        <span key={idx} className="badge" style={{color: textColorFromBackground(badge.color), background: badge.color}}>{badge.text}</span>
                    </Link>
                </React.Fragment>
            ))}
        </div>
    )
}

export default BadgeHome