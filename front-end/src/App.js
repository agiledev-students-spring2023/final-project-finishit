import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Home'
import Header from './Header'
import Menu from './Menu'
import NewTask from './NewTask'
import EditTask from './EditTask'


const App = props => {
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="App-main">
          <Routes>
            {/* a route for the home page */}
            <Route path="/" element={<Home />} />

            {/* a route to see a list of all messages */}
            <Route path="/menu" element={<Menu />} />
            <Route path="/newtask" element={<NewTask />} />
            <Route path="/edittask" element={<EditTask />} />
            

          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App