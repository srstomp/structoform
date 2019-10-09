import React from 'react'
import PropTypes from 'prop-types'
import { id } from '../constants/helper'

const Checkbox = ({label, name, value = false, onChange, showError = false, className = ''}) =>
    <div className={`form-item ${className}`}>
        <div className="form-item__inner">
            <input className='form-item__input' type='checkbox' name={name} value={value} onChange={onChange}
                   htmlFor={id}/>
            <label className={`form-item__label--checkbox ${showError ? 'error' : ''}`} htmlFor={id}>{label}</label>
        </div>
    </div>

export default Checkbox

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    showError: PropTypes.bool,
    className: PropTypes.string
}
