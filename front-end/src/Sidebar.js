import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Menu from 'react-burger-menu/lib/menus/slide'
import axios from 'axios'
import './Sidebar.css'

/**
 * A React component that represents the Menu page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Sidebar = props => {
    const jwtToken = localStorage.getItem('token')

    const [user, setUser] = useState(null)
    const logoutHandler = e => {
        console.log('in logout handler')
        e.preventDefault()
        localStorage.clear()
        window.location = '/login'
    }

    useEffect(() => {
        if (jwtToken != null && window.location !== '/login') {
            axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/auth/userInfo`, {
                headers: { Authorization: `JWT ${jwtToken}` }
            }).then(response => {
                setUser(response.data)
            }).catch(err => {
                if (err.response.status === 401) {
                    localStorage.clear()
                    window.location = '/login'
                }
            })
        }
    }, [jwtToken])

    return (
        <Menu className="bm-item-list">
            {!user && (
                <Link
                    to="/login"
                    className="bm-item"
                    onClick={() => {
                        props.isOpen = false
                    }}
                >
                    <h4>Log In</h4>
                </Link>
            )}
            {user && (
                <Link
                    to="/logout"
                    className="bm-item"
                    onClick={logoutHandler}
                    style={{
                        color: 'rebeccapurple'
                    }}
                >
                    <h4>Logout</h4>
                </Link>
            )}
            {user && (
                <Link
                    to="/"
                    className="bm-item"
                    onClick={() => {
                        props.isOpen = false
                    }}
                >
                    <h4>My Tasks</h4>
                </Link>
            )}
            {user && (<Link to="/badges" className="bm-item" onClick={() => { props.isOpen = false }}><h4>Badges</h4></Link>
            )}
            {user && (<Link to="/settings" className="bm-item" onClick={() => { props.isOpen = false }}><h4>Settings</h4></Link>
            )}
        </Menu>
    )
}

// make this component available to be imported into any other file
export default Sidebar
