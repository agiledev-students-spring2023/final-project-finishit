import './EditBadge.css'
import React, { useState } from 'react'

const EditBadge = props => {
    const textColorFromBackground = background => {
        const hexToRGB = hex => {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
            return result ? [ parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16) ] : null
        }
    
        const rgb = hexToRGB(background)
        return (rgb[0]*0.299 + rgb[1]*0.587 + rgb[2]*0.114) > 154 ? 'black' : 'white'
    }

    const [badge] = useState({color: "#ff0000", text: "Sample Editable Text"})

    const oldColor = badge.color
    const oldText = badge.text
    
    const [badgeColor, setBadgeColor] = useState(badge.color)
    const [badgeText, setBadgeText] = useState(badge.text)

    return (
        <div id="badgeform">
            <form action="/">
                <label>Badge Color</label><br/>
                <input id="badgecolor" type="color" value={badgeColor} onChange={e => setBadgeColor(e.target.value)} />
                <br/><span>(Click the colored section to change the color.)</span><br/><br/>
                <label>Badge Text</label><br/>
                <input className="inputBox" type="text" value={badgeText} onChange={e => setBadgeText(e.target.value)} />
                <br/><br/>
                <label>Previous Badge Preview</label><br/><br/>
                <span className="badge" style={{color: textColorFromBackground(oldColor), background: oldColor}}>{oldText}</span>
                <br/><br/>
                <label>Updated Badge Preview</label><br/><br/>
                <span className="badge" style={{color: textColorFromBackground(badgeColor), background: badgeColor}}>{badgeText}</span>
                <br/><br/><br/><br/>
                <center><button className="submitButton" type="submit">Update Badge</button></center>
            </form>
        </div>
    )
}

export default EditBadge