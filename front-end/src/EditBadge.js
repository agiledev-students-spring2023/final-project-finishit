import './EditBadge.css'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const EditBadge = props => {
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

    const [badge, setBadge] = useState({ id: 0, color: '#0000ff', text: 'Badge not found' })
    const [badgeColor, setBadgeColor] = useState(badge.color)
    const [badgeText, setBadgeText] = useState(badge.text)

    const [oldColor, setOldColor] = useState(badge.color)
    const [oldText, setOldText] = useState(badge.text)

    const [error, setError] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()
    const jwtToken = localStorage.getItem('token')

    const handleSubmit = e => {
        e.preventDefault()
        axios.post(
            `${process.env.REACT_APP_SERVER_HOSTNAME}/badges/${id}`,
            {
                editedBadge: { color: badgeColor, text: badgeText } },
            { headers: { Authorization: `JWT ${jwtToken}` } }
        ).then(response => {
            if (response.data.changedSuccess) {
                navigate('/badges')
            } else if (response.data.status) {
                setError(response.data.status)
            }
        }).catch(err => {
            setError('Something went wrong. Please try again later.')
            console.log(err)
        })
    }

    const handleDelete = e => {
        e.preventDefault()
        axios.get(
            `${process.env.REACT_APP_SERVER_HOSTNAME}/rmBadge/${id}`,
            { headers: { Authorization: `JWT ${jwtToken}` } }
        )
            .then(response => {
                if (response.data.deleteSuccess) {
                    navigate('/badges')
                } else if (response.data.status) {
                    setError(response.data.status)
                }
            }).catch(err => {
                setError('Something went wrong. Please try again later.')
                console.log(err)
            })
    }

    useEffect(() => {
        const fetchBadge = () => {
            axios.get(
                `${process.env.REACT_APP_SERVER_HOSTNAME}/badges/${id}`,
                { headers: { Authorization: `JWT ${jwtToken}` } }
            )
                .then(response => {
                    if (response.data.status) {
                        setError(response.data.status)
                        return
                    }
                    const dataBadge = response.data.badge
                    setBadge(dataBadge)
                    setBadgeColor(dataBadge.color)
                    setBadgeText(dataBadge.text)
                    setOldColor(dataBadge.color)
                    setOldText(dataBadge.text)
                    setError('')
                }).catch(err => {
                    setError('Something went wrong. Please try again later.')
                    console.log(err)
                })
        }
        if (!jwtToken) {
            navigate('/login')
        } else {
            fetchBadge()
        }
    }, [jwtToken, id, navigate])

    return (
        <div id="badgeform">
            {error && (
                <p>
                    Error:
                    {error}
                </p>
            )}
            <form onSubmit={e => handleSubmit(e)}>
                <label>Badge Color</label>
                <br />
                <input id="badgecolor" type="color" value={badgeColor ?? '#0000ff'} onChange={e => setBadgeColor(e.target.value)} />
                <br />
                <span>(Click the colored section to change the color.)</span>
                <br />
                <br />
                <label>Badge Text</label>
                <br />
                <input className="inputBox" type="text" value={badgeText ?? 'Placeholder'} onChange={e => setBadgeText(e.target.value)} />
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
            </form>
            <form onSubmit={e => handleDelete(e)}>
                <center><button className="submitButton deleteButton" type="submit">Delete Badge</button></center>
            </form>
        </div>
    )
}

export default EditBadge
