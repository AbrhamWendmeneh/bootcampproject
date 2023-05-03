 
 import './styles/navbar.css'
 import {Link} from 'react-router-dom'
 import logo from '../assets/Images/yentaLogo.png'
const NavBar = ({setLogInModalOPen}) => {
  let isLoggedIn=localStorage.getItem('token')
  return (
     <nav className='nav-main-container'>
        <div className='logoImage-container'>
          <img src={logo} alt="" />
        </div>
        <div className="nav-right-container">
          <Link style={{color:'#1e1e1e',textDecoration:'none'}} to="/">Home</Link>
         {isLoggedIn?<Link style={{color:'#1e1e1e',textDecoration:'none'}} to="/manage">
          Manange</Link>:''}
          {!isLoggedIn?
          <button 
            onClick={setLogInModalOPen} 
            className="nav__button">logIn</button>:
           <button 
            onClick={()=>localStorage.removeItem('token')} 
            className="nav__button">logOut</button>}
        </div>
    </nav>
  )
}

export default NavBar