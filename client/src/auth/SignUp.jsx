import { useEffect, useState } from 'react'
import './styles/login.css'
import InputField from '../components/InputField'
import Button from '../components/Button'
import './styles/signup.css'
import {Link } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
function SignUp({setSignUpModalOPen,setLogInModalOPen, closeSignUpModal}) {
  
  const [email,setEmail]= useState('')
  const [password,setPassword]= useState('')
  const [name,setName]= useState('')
  const [isButtonDisabled,setButtonDisable]=useState(true)
  

  const handleSignUp=async()=>{

    let Basic_Url='http://localhost:8000';

    const userData={
      'name':name,
      'password':password,
      'email':email
    }
     try {
           const response= await axios.post(`${Basic_Url}/signUp`,userData)
          toast.success(response.data)
          setLogInModalOPen(true)
     } catch (error) { 
        toast.error(error)
     }
  }

  useEffect(()=>{
    if(email!==''&&password!==''&&name!==''){
       setButtonDisable(false)
    }else setButtonDisable(true)
  },[email,password,name])

  return (
    <div className='signUp-main-container'>
        <div onClick={closeSignUpModal} className='close-icon'>X</div>
        <h1 style={{fontSize:'18px'}}>SignUp</h1>
        <div style={{width:'80%',height:'2px',backgroundColor:'rgba(0,0,0,0.5)'}}/>
          <InputField 
           title={'User Name'} 
           type={'text'} 
           placeholder={'Enter name'}
           setValue={setName}
           value ={name}
           name='userName'
           error={'valid user name is required'}
         />
        
        <InputField 
         title={'Email'} 
         type={'email'} 
         placeholder={'Enter email'}
         setValue={setEmail}
         value ={email}
         name='email'
         error={'valid email is required'}
         />
         <InputField 
         title={'Password'} 
         type={'password'} 
         placeholder={'Enter password'}
         setValue={setPassword}
         value ={password}
         name='password'
         error={'valid password is required'}
         />
         <Button
           handleClick={handleSignUp}
           btnLabel={'SignUp'}
           isButtonDisabled={isButtonDisabled}
         />
         <div style={{width:'80%', display:'flex',marginBottom:'20px',justifyContent:'center',alignItems:'center'}}>
          <span style={{color:'#1e1e1e'}}>already have an account?</span>
          <div onClick={setLogInModalOPen} style={{marginLeft:'4px',color:'blue',cursor:'pointer'}}>SignIn</div>
         </div>
    </div>
  )
}

export default SignUp