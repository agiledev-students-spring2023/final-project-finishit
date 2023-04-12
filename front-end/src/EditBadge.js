import './EditBadge.css'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const EditBadge = props => {
    const { id } = useParams()

    const textColorFromBackground = background => {
        const hexToRGB = hex => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
            return result ? [
                parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)
            ] : null
        }

        const rgb = hexToRGB(background)
        return (rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114) > 154 ? 'black' : 'white'
    }

    const [badge, setBadge] = useState({ id: 0, color: '#0000ff', description: 'Badge not found' })
    const [badgeColor, setBadgeColor] = useState(badge.color)
    const [badgeText, setBadgeText] = useState(badge.description)

    const [oldColor, setOldColor] = useState(badge.color)
    const [oldText, setOldText] = useState(badge.description)

    useEffect(() => {
        const fetchBadge = () => {
            axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/badges/${id}`)
                .then(response => {
                    setBadge(response.data.badge)
                    setBadgeColor(badge.color)
                    setBadgeText(badge.text)
                    setOldColor(badge.color)
                    setOldText(badge.text)
                }).catch(err => {
                    console.log(err)
                })
        }

        fetchBadge()
    }, [])

    return (
        <div id="badgeform">
            <form action="/badges">
                <label>Badge Color</label>
                <br />
                <input id="badgecolor" type="color" value={badgeColor} onChange={e => setBadgeColor(e.target.value)} />
                <br />
                <span>(Click the colored section to change the color.)</span>
                <br />
                <br />
                <label>Badge Text</label>
                <br />
                <input className="inputBox" type="text" value={badgeText} onChange={e => setBadgeText(e.target.value)} />
                <br />
                <br />
                <label>Previous Badge Preview</label>
                <br />
                <br />
                <span className="badge" style={{ color: textColorFromBackground(oldColor), background: oldColor }}>{oldText}</span>
                <br />
                <br />
                <label>Updated Badge Preview</label>
                <br />
                <br />
                <span className="badge" style={{ color: textColorFromBackground(badgeColor), background: badgeColor }}>{badgeText}</span>
                <br />
                <br />
                <br />
                <br />
                <center><button className="submitButton" type="submit">Update Badge</button></center>
                <br />
                <br />
                <center><button className="submitButton deleteButton" type="submit">Delete Badge</button></center>
            </form>
        </div>
    )
}

export default EditBadge
