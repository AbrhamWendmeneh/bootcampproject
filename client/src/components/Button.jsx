import React from 'react'
import './styles/button.css'
const Button = ({handleClick,btnLabel,btnWidth,isButtonDisabled}) => {
  return (
    <button
    style={{width:btnWidth?btnWidth:'80%',
    backgroundColor:isButtonDisabled?'#DFDFDF':'#162938'
   }}
   disabled={isButtonDisabled} 
      onClick={handleClick} 
      className='btn-container'>
        {btnLabel}
    </button>
  )
}

export default Button