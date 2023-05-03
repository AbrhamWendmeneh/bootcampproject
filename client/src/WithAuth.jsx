import React from 'react';
// import { edirect } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';

const WithAuth = () => {
 
    const token=localStorage.getItem('token')
    const isAuthenticated = token;// check if user is authenticated, e.g. by checking a token in local storage

 return (
  isAuthenticated?<Outlet/>:<Navigate to ='/'/>
 )


};

export default WithAuth;
