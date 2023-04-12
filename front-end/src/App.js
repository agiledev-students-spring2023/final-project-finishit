import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Home'
import Header from './Header'
import Create from './Create'
import Login from './Login'
import Reset from './Reset'
import ConfirmP from './ConfirmP'
import Settings from './Settings'
import NewTask from './NewTask'
import EditTask from './EditTask'
import NewBadge from './NewBadge'
import EditBadge from './EditBadge'
import BadgeHome from './BadgeHome'

const App = props => (
    <div className="App">
        <Router>
            <Header />
            <main className="App-main">
                <Routes>
                    {/* a route for the home page */}
                    <Route path="/" element={<Home />} />

                    {/* a route to see create account page */}
                    <Route path="/create" element={<Create />} />

                    {/* a route to see login page */}
                    <Route path="/login" element={<Login />} />

                    {/* a route to see reset page */}
                    <Route path="/reset" element={<Reset />} />

                    {/* a route to see confirm password page */}
                    <Route path="/confirmp" element={<ConfirmP />} />

                    {/* a route to see confirm password page */}
                    <Route path="/settings" element={<Settings />} />

                    {/* routes for creating and editing tasks */}
                    <Route path="/newtask" element={<NewTask />} />
                    <Route path="/edittask" element={<EditTask />} />

                    {/* a route to the badge landing page */}
                    <Route path="/badges" element={<BadgeHome />} />

                    {/* routes for creating and editing badges */}
                    <Route path="/newbadge" element={<NewBadge />} />
                    <Route path="/editbadge/:id" element={<EditBadge />} />

                </Routes>
            </main>
        </Router>
    </div>
)

export default App
