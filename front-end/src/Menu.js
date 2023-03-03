import { Link } from 'react-router-dom'
import './Menu.css'

/**
 * A React component that represents the Menu page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Menu = props => {
  return (
    <>
      <Link to="/login">Log in</Link>
      <br></br>
      <Link to="/">Main</Link>
      <br></br>
      <Link to="/settings">Settings</Link>
      
    </>
  )
}

// make this component available to be imported into any other file
export default Menu