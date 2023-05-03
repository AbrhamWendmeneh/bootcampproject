import React from 'react'
import './styles/modal.css'
const Modal = ({children}) => {
  return (
    <div className='modal-main-container'>
         {children}
    </div>
  )
}

export default Modal