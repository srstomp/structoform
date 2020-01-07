import React, {useState, useRef} from 'react';
import PropTypes from "prop-types";
import { id } from '../constants/helper';
import FormItem from "./FormItem";

const PasswordField = ({label, name, value, direction, type, placeholder, onChange, errorMessage, showError}) => {
    const [passwordIsShown, setPasswordIsShown] = useState(false)
    const inputEl = useRef(null)

    const togglePassword = () => {
         inputEl.current.type = inputEl.current.type === 'password' ? 'text' : 'password'
         setPasswordIsShown(inputEl.current.type === 'text')
     }

     const passwordToggleButton = () => {
         return (
             type === 'password' ?
                 <button className="form-item__input-button" onClick={togglePassword}>
                     {
                         passwordIsShown ? <EyeOpen width={35} height={25}/> : <Eye width={35} height={25}/>
                     }
                 </button> : null
         )
     }

    return (
        <FormItem label={label} direction={direction}>
            <div className="form-item__inner">
                <input className={`form-item__input ${showError ? 'error' : ''}`} placeholder={placeholder}
                       ref={inputEl} type={type} onChange={onChange} name={name} htmlFor={id} value={value}/>
                {passwordToggleButton()}
                <span className={`error-label ${showError ? '' : 'hide'}`}>{errorMessage}</span>
            </div>
        </FormItem>
    )
}

export default PasswordField

PasswordField.direction = {
    row: '--row',
    column: '--column',
}

PasswordField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(Object.values(PasswordField.direction)),
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    errorMessage: PropTypes.string,
    showError: PropTypes.bool.isRequired
}
