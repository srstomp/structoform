import React from 'react';
import PropTypes from "prop-types";
import { id } from '../constants/helper';

const TextArea = ({label, name, value = '', direction, placeholder, onChange, errorMessage, showError = false,
                       className = ""}) =>
    <div className={`form-item form-item${direction} ${className}`}>
        {label !== '' ? <label className={`form-item__label`} htmlFor={id}>{label}</label> : null}
        <div className="form-item__inner">
            <textarea className={`form-item__textarea ${showError ? 'error' : ''}`} placeholder={placeholder}
                      onChange={onChange} name={name} htmlFor={id}>
                { value }
            </textarea>
            <span className={`form-item__error-label ${showError ? '' : 'hide'}`}>{errorMessage}</span>
        </div>
    </div>

export default TextArea

TextArea.direction = {
    row: '--row',
    column: '--column',
}

TextArea.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    direction: PropTypes.oneOf(Object.values(TextField.direction)),
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    errorMessage: PropTypes.string,
    showError: PropTypes.bool
}
