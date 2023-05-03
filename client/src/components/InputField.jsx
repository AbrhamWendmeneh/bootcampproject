
import { useState } from 'react';
import './styles/inputfield.css'
import { pattern } from '../../verifier/patternVerifier';
const InputField = ({ title, type, placeholder, error, setValue, value, name }) => {

  const [isValid, setValid] = useState(false)
  const [isEmpity, setEmpty] = useState()

  const validate = (field, regex) => {
    let inputValue = field.value
    if (!regex.test(inputValue)) {
      if (inputValue !== '') {
        setEmpty(error)
      } else if (inputValue === '') { setEmpty('input is required') }
      setValid(true)
    } else setValid(false)
  }

  const handleInput = (e) => {
    validate(e.target, pattern[e.target.attributes.name.value])
    setValue(e.target.value)

  }
  return (
    <div className='input-field-main-container'>
      <label className='input-field-title'>{title}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={handleInput}
        value={value}
        name={name}
        className='input' />
      {isValid ? <label className='error-display'>{isEmpity}</label> : ''}
    </div>
  )
}

export default InputField