import React from 'react'
import PropTypes from 'prop-types'
import { id, direction } from '../constants/helper'

const SelectField = ({label, name, values, direction, onChange, errorMessage, showError = false, className = ''}) =>
    <div className={`form-item form-item${direction} ${className}`}>

        <label className={`form-item__label`} htmlFor={id}>{label}</label>

        <div className="form-item__inner">
            <select className={`form-item__select ${errorMessage !== '' ? 'error' : ''}`} htmlFor={id} name={name}
                    onChange={onChange}>
                <option></option>
                {
                    values.map((item, i) => <option key={i}>{item}</option>)
                }
            </select>
            <span className={`form-item__error-label ${showError ? '' : 'hide'}`}>{errorMessage}</span>
        </div>

    </div>

export default SelectField

SelectField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
    direction: PropTypes.oneOf(Object.values(direction)),
    onChange: PropTypes.func,
    errorMessage: PropTypes.string,
    showError: PropTypes.bool,
    className: PropTypes.string
}
