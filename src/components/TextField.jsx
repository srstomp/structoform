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
            return 'numeric'
        default:
            return 'text'
    }
}

const TextField = ({ id, name, placeholder, value, type, showError, onChange }) => {
    const [currentValue, setCurrentValue] = useState(value)

    useEffect(() => {
        onChange(name, currentValue)
    }, [currentValue])

    const handleChange = e => setCurrentValue(e.target.value)
    const inputMode = getInputMode(type)

    return (
        <input
            className={`form-item__input ${showError ? 'error' : ''}`}
            placeholder={placeholder}
            type={type}
            onChange={handleChange}
            name={name} htmlFor={id}
            value={currentValue}
            inputMode={inputMode}
        />
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
