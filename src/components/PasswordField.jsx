import React, {useState, useRef} from 'react';
import PropTypes from "prop-types";
import { id } from '../constants/helper';
import FormItem from "./FormItem";

const PasswordField = ({label, name, value, direction, type, placeholder, onChange, errorMessage, showError, toggleLabelShow, toggleLabelHide}) => {
    const [passwordIsShown, setPasswordIsShown] = useState(false)
    const inputEl = useRef(null)

    const togglePassword = () => {
         inputEl.current.type = inputEl.current.type === 'password' ? 'text' : 'password'
         setPasswordIsShown(inputEl.current.type === 'text')
     }

     const passwordToggleButton = () => {
         return (
             type === 'password' ?
                 <button className={`form-item__input-button ${!passwordIsShown ? '.active' : ''}`} onClick={togglePassword}>
                     {
                         !passwordIsShown ? toggleLabelShow : toggleLabelHide
                     }
                 </button> : null
         )
     }

    return (
        <FormItem label={label} direction={direction}>
            <div className="form-item__inner" style={{display: 'flex', alignItems: 'center'}}>
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
    toggleLabelShow: PropTypes.string,
    toggleLabelHide: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(Object.values(PasswordField.direction)),
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    errorMessage: PropTypes.string,
    showError: PropTypes.bool.isRequired
}
