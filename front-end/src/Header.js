import './Header.css'
import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'

/**
 * A React component that is used for the header displayed at the top of every page of the site.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Header = props => (
    <header className="Header-header">
        <Sidebar className="headerElement" pageWrapId="page-wrap" outerContainerId="outer-container" />
        <h1 className="headerElement">FinishIt</h1>
        <Link to="/newtask" className="headerElement" id="mk-task-link">
            <button id="mk-task" type="button">+</button>
        </Link>
    </header>
)

// make this component available to be imported into any other file
export default Header
