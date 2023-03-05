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
    <br></br>
    <div className='menuView'>
      <Link to="/login" className='menuButton'><h4>Log In</h4></Link>
      <Link to="/" className='menuButton'><h4>Main</h4></Link>
      <Link to="/settings" className='menuButton'><h4>Settings</h4></Link>
      <Link to="/newtask" className='menuButton'><h4>New Task</h4></Link>
     
    </div>
    </>
  )
}

// make this component available to be imported into any other file
export default Menu