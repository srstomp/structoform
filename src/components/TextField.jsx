import React from 'react'
import PropTypes from "prop-types"
import { id, direction } from '../constants/helper'

const TextField = ({label, name, value = '', direction, type, placeholder, onChange, errorMessage, showError = false,
                       className = ''}) =>
    <div className={`form-item form-item${direction} ${className}`}>

        {label !== '' && <label className={`form-item__label`} htmlFor={id}>{label}</label>}

        <div className="form-item__inner">
            <input className={`form-item__input ${showError ? 'error' : ''}`} placeholder={placeholder}
                   type={type} onChange={onChange} name={name} htmlFor={id} value={value}/>
            <span className={`form-item__error-label ${showError ? '' : 'hide'}`}>{errorMessage}</span>
        </div>

    </div>

export default TextField

TextField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    direction: PropTypes.oneOf(Object.values(direction)),
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    errorMessage: PropTypes.string,
    showError: PropTypes.bool,
    className: PropTypes.string
}
