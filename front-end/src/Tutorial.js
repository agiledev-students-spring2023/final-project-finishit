import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Tutorial.css'

const Tutorial = props => {
    const [error, setError] = useState(undefined)
    const navigate = useNavigate()

    const handleSubmit = async event => {
    }

    return (
        <div>
            <br />
            <h1>Tutorial</h1>
            <form onSubmit={handleSubmit}>
                <h2 className="h2Custom">1. Creating An Account:</h2>
                <ul className="ulCustom">
                    <li>
                        Input a username.
                        <ul className="ulCustom">
                            <li>Usernames must be between 4 to 12 characters long, inclusive.</li>
                        </ul>
                    </li>
                    <li>
                        Input a password.
                        <ul className="ulCustom">
                            <li>Passwords must be between 6 to 12 characters long, inclusive.</li>
                        </ul>
                    </li>
                    <li>
                        Input a pet name to be used as a security question for verification if
                        you forgot your password.
                    </li>
                    <li>
                        Input mother’s maiden name to be used as a security question for
                        verification if you forgot your password.
                    </li>
                </ul>
                <br />
                <h2 className="h2Custom">2. Logging in:</h2>
                <ul className="ulCustom">
                    <li>Input your username and password to login.</li>
                </ul>
                <br />
                <h2 className="h2Custom">3. Adding Tasks:</h2>
                <ul className="ulCustom">
                    <li>In the home page, you will be able to see all your tasks.</li>
                    <li>It will initially be empty.</li>
                    <li>Click on the plus button on the top right corner.</li>
                    <li>Enter the details.</li>
                    <li>Task name, due date, and status are required fields. </li>
                    <li>Selecting a badge is optional. </li>
                    <li>
                        Click on the “Submit Task” button to add your task to your list of
                        tasks.
                    </li>
                    <li>Click on “Cancel” to cancel adding a new task.</li>
                </ul>
                <br />
                <h2 className="h2Custom">4. Editing Tasks:</h2>
                <ul className="ulCustom">
                    <li>To edit a task, click on the name of the task.</li>
                    <li>Edit the details as needed.</li>
                    <li>Click on “Edit Task” to confirm your changes.</li>
                    <li>Click on “Delete Task” to delete your task.</li>
                    <li>Click on “Discard Changes” to discard your changes. </li>
                </ul>
                <br />
                <h2 className="h2Custom">5. Filtering Tasks:</h2>
                <ul className="ulCustom">
                    <li>
                        Tasks can be filtered into one of three statuses:
                        <ul className="ulCustom">
                            <li>Not started</li>
                            <li>In progress</li>
                            <li>Completed</li>
                        </ul>
                    </li>
                    <li>
                        To filter your tasks, click on the desired status in the bar
                        at the bottom of the screen.
                    </li>
                    <li>
                        To change the status of a task:
                        <ul className="ulCustom">
                            <li>
                                Refer to Step 4 above to change the status
                                through the edit screen.
                            </li>
                            <li>
                                Click on the button at the right to move
                                the status to the next stage.
                            </li>
                            <li>
                                Please note that through this method, you can only move
                                the given task forward in status.
                            </li>
                            <li>Example: from “Not Started” to “In Progress”</li>
                            <li>Example: from “In Progress” to “Completed”</li>
                            <li>
                                If you wish to do the reverse, please do so through
                                the edit task feature.
                            </li>
                        </ul>
                    </li>
                </ul>
                <br />
                <h2 className="h2Custom">6. Sidebar:</h2>
                <ul className="ulCustom">
                    <li>
                        Click on the three bars button on the top left corner of the screen
                        to open the sidebar.
                    </li>
                    <li>Click on “Logout” to logout.</li>
                    <li>Click on “My Tasks” to view the home page with your tasks.</li>
                    <li>Click on “Badges” to view, add or edit badges.</li>
                    <li>Click on “Settings” to change your username or password.</li>
                </ul>
                <br />
                <h2 className="h2Custom">7. Creating Badges:</h2>
                <ul className="ulCustom">
                    <li>Go to “Badges” from the sidebar.</li>
                    <li>Click on the blue link to create a new badge.</li>
                    <li>Choose a color for your badge.</li>
                    <li>Choose a name for your badge.</li>
                    <li>Click on “Create New Badge” to create your badge.</li>
                    <li>Click on “Cancel” to cancel creating a new badge.</li>
                </ul>
                <br />
                <h2 className="h2Custom">8. Editing Badges:</h2>
                <ul className="ulCustom">
                    <li>Go to “Badges” from the sidebar.</li>
                    <li>Click on the badge you wish to edit.</li>
                    <li>Change the details as desired.</li>
                    <li>Click on “Update Badge” to confirm your changes.</li>
                    <li>Click on “Discard Changes” to discard your changes.</li>
                    <li>Click on “Delete Badge” to delete your badge.</li>
                </ul>
                <br />
                <h2 className="h2Custom">9. Assigning Badges To Tasks:</h2>
                <ul className="ulCustom">
                    <li>Refer to Step 3 to assign a badge while creating a new task.</li>
                    <li>Refer to Step 4 to assign a badge to an existing task.</li>
                </ul>
                <br />
                <h2 className="h2Custom">10. Changing Username or Password:</h2>
                <ul className="ulCustom">
                    <li>Go to “Settings” from the sidebar.</li>
                    <li>
                        To change your username:
                        <ul className="ulCustom">
                            <li>Enter a new username.</li>
                            <li>Re-enter the new username.</li>
                            <li>Click on “Confirm Changes” to confirm your changes.</li>
                        </ul>
                    </li>
                    <li>
                        To change your password:
                        <ul className="ulCustom">
                            <li>Enter a new password.</li>
                            <li>Re-enter the new password.</li>
                            <li>Click on “Confirm Changes” to confirm your changes.</li>
                        </ul>
                    </li>
                </ul>
                <br />
                <h2 className="h2Custom">11. Deleting Account:</h2>
                <ul className="ulCustom">
                    <li>Go to “Settings” from the sidebar.</li>
                    <li>Click on “Delete Account”.</li>
                    <li>Click on “No” if you wish to keep your account.</li>
                    <li>Click on “Yes” to confirm and delete your account.</li>
                </ul>
            </form>
        </div>
    )
}

export default Tutorial
