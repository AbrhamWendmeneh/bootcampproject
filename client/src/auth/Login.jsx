import  { useEffect, useState } from 'react'
import './styles/login.css'
import InputField from '../components/InputField'
import Button from '../components/Button'
import {Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'

function Login({setSignUpModalOPen,setLogInModalOPen}) {
  const [email,setEmail]= useState('')
  const [password,setPassword]= useState('')
  const [isButtonDisabled,setButtonDisable]=useState(true)
  const navigate=useNavigate();


    useEffect(()=>{
    if(email!==''&& password!==''){
       setButtonDisable(false)
    }else setButtonDisable(true)
  },[email,password])


   const handleSignIn=async()=>{

    let Basic_Url='http://localhost:8000';

    const userData={
      'password':password,
      'email':email
    }
     try {
           const response= await axios.post(`${Basic_Url}/login`,userData)
         console.log(response.data)
          localStorage.setItem('token',response.data.id)
          navigate('/manage')
          
     } catch (error) { 
       console.log(error);
     }

    }

  return (
    <div className='login-main-container'>
        <div onClick={setLogInModalOPen} className='close-icon'>X</div>
        <h1 style={{fontSize:'18px'}}>Login</h1>
        <div style={{width:'80%',height:'2px',backgroundColor:'rgba(0,0,0,0.5)'}}/>
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
           handleClick={handleSignIn}
           btnLabel={'Login'}
          isButtonDisabled={isButtonDisabled}
         />
         <div style={{width:'80%', display:'flex',marginBottom:'20px',justifyContent:'center',alignItems:'center'}}>
          <span style={{color:'#1e1e1e'}}>already have an account?</span>
          <div onClick={setSignUpModalOPen} style={{marginLeft:'4px',color:'blue',cursor:'pointer'}}>SignUp</div>
         </div>
    </div>
  )
}

export default Login