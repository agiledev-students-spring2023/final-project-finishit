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

const MenuLink = props => (
    <Link
        to={props.to}
        onClick={() => { props.useFunc(false) }}
    >
        <h4>{props.text}</h4>
    </Link>
)

const Sidebar = props => {
    const jwtToken = localStorage.getItem('token')

    const [user, setUser] = useState(null)
    const logoutHandler = e => {
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

    const [menuOpen, setOpen] = useState(false)

    return (
        <Menu
            className="bm-item-list"
            isOpen={menuOpen}
            onStateChange={state => setOpen(state.isOpen)}
        >
            {!user && (
                <MenuLink to="/login" cn="bm-item" text="Log In" useFunc={setOpen} />
            )}
            {user && (
                <Link
                    to="/logout"
                    className="bm-item"
                    onClick={logoutHandler}
                >
                    <h4>Logout</h4>
                </Link>
            )}
            {user && (<MenuLink to="/" className="bm-item" text="My Tasks" useFunc={setOpen} />
            )}
            {user && (<MenuLink to="/badges" className="bm-item" text="Badges" useFunc={setOpen} />
            )}
            {user && (<MenuLink to="/settings" className="bm-item" text="Settings" useFunc={setOpen} />
            )}
            {user && (<MenuLink to="/tutorial" className="bm-item" text="Tutorial" useFunc={setOpen} />
            )}
            {user && (
                <p>
                    Currently logged in as:
                    {` ${user.username}`}
                </p>
            )}
        </Menu>
    )
}

// make this component available to be imported into any other file
export default Sidebar
