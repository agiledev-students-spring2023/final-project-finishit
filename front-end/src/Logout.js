import React from 'react'

const Logout = props => {
    localStorage.clear()
    window.location.href = '/login'

    return (
        <div>
            Successfully logged out of your account!
        </div>
    )
}

export default Logout
