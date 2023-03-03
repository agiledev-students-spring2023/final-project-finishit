import './Header.css'
import hamburger_menu from './hamburger.png'
import new_task from './new-task.png'
import { Link } from 'react-router-dom'

/**
 * A React component that is used for the header displayed at the top of every page of the site.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Header = props => {
  return (
    <header className="Header-header">
      <Link to="/menu" className="hamburger">
          <img src={hamburger_menu} alt="Hamburger menu" />
      </Link>
      <h1>FinishIt</h1>
      <Link to="/newtask" className="mkTask">
        <img src={new_task} alt="New task" />
      </Link>
    </header>
  )
}

// make this component available to be imported into any other file
export default Header