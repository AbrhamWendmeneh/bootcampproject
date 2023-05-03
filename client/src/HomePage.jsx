
import { useState } from 'react'
import SignUp from './auth/SignUp'
import Modal from './components/Modal'
import NavBar from './components/NavBar'
import './style.css'
import Login from './auth/Login'
import landingPageImage from './assets/Images/image.webp'
import 'react-toastify/dist/ReactToastify.css';


const HomePage = () => {
    const [isLoginModalOpened,setLoginModalOpened]= useState(false)
    const [isSignUpModalOpened,setSignUpModalOpened]= useState(false)

    const handleSignUpModal=()=>{
        setSignUpModalOpened(true)
        setLoginModalOpened(false)
    }
    const handleLoginModal=()=>{
        setSignUpModalOpened(false)
        setLoginModalOpened(true)
    }

  return (
   <div className='home-page-main-container'>
    
    {isLoginModalOpened?<Modal>
         <Login 
           setSignUpModalOPen={handleSignUpModal}
           setLogInModalOPen={()=>setLoginModalOpened(false)}
          />
    </Modal>:
    ''}
     {isSignUpModalOpened?<Modal>
       <SignUp
           setSignUpModalOPen={()=>setSignUpModalOpened(true)}
           closeSignUpModal={()=>setSignUpModalOpened(false)}
           setLogInModalOPen={()=>handleLoginModal(true)}
        />
     </Modal>:''}
    <NavBar  setLogInModalOPen={()=>setLoginModalOpened(true)}/>

    <section className='landing__page__container'>
      <div className='top-layer'>
          <h1 style={{fontSize:'45px',color:'white'}}>
            Task Management System
          </h1>
        </div> 
        <img 
         src={landingPageImage} 
         alt='Landing page' 
         loading='lazy'
         style={{width:'100%',height:'100%'}}
         /> 
    </section> 
   </div>

  )
}

export default HomePage