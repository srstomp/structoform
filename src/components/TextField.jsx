import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { direction } from '../constants/helper'
import _ from 'lodash'

const getInputMode = type => {
    switch (type) {
        case 'email':
            return 'email'
        case 'phone':
            return 'tel'
        case 'number':
            return 'decimal'
        case 'percentage':
            return 'decimal'
        case 'euro':
            return 'decimal'
        default:
            return 'text'
    }
}

const getInputWrapperClass = type => {
    switch (type) {
        case 'percentage':
        case 'euro':
            return `form-item__text-wrapper form-item__text-wrapper--${type}`
        default:
            return 'form-item__text-wrapper'
    }
}

const TextField = ({ id, name, placeholder, value, type, showError, onChange }) => {
    const [currentValue, setCurrentValue] = useState(value)
    const wrapperClass = getInputWrapperClass(type)

    useEffect(() => {
        onChange(name, currentValue)
    }, [currentValue])

    const handleChange = e => setCurrentValue(e.target.value)
    const inputMode = getInputMode(type)

    return (
        <div className={wrapperClass}>
            <input
                className={`form-item__input ${showError ? 'error' : ''}`}
                placeholder={placeholder}
                type={type}
                onChange={handleChange}
                name={name} htmlFor={id}
                value={currentValue}
                inputMode={inputMode}
            />
        </div>
    )
}

export default TextField

TextField.defaultProps = {
    value: '',
}

TextField.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string.isRequired,
    showError: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
}
