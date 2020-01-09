import React from 'react';
import PropTypes from "prop-types";
import { id, direction } from '../constants/helper';

const TextArea = ({label, name, value = '', direction, placeholder, onChange, errorMessage, showError}) =>
    <div className={`form-item form-item${direction}`}>

        {label !== '' && <label className={`form-item__label`} htmlFor={id}>{label}</label>}

        <div className="form-item__inner">
            <textarea className={`form-item__textarea ${showError ? 'error' : ''}`} placeholder={placeholder}
                      onChange={onChange} name={name} htmlFor={id} value={value}>
            </textarea>
            <span className={`error-label ${showError ? '' : 'hide'}`}>{errorMessage}</span>
        </div>

    </div>

export default TextArea

TextArea.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    direction: PropTypes.oneOf(Object.values(direction)),
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    errorMessage: PropTypes.string,
    showError: PropTypes.bool.isRequired
}
