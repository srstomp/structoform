import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { direction } from '../constants/helper'
import _ from 'lodash'

const TextField = ({ id, name, placeholder, value, type, showError, onChange, isVisible }) => {
    const [currentValue, setCurrentValue] = useState(value)

    useEffect(() => {
        onChange(name, currentValue, { isVisible })
    }, [currentValue, isVisible])

    const handleChange = e => setCurrentValue(e.target.value)

    const inputmode = () => {
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

    return (
        <input
            className={`form-item__input ${showError ? 'error' : ''}`}
            placeholder={placeholder}
            type={type}
            onChange={handleChange}
            name={name} htmlFor={id}
            value={currentValue}
            inputMode={inputmode()}
        />
    )
}

export default TextField

TextField.defaultProps = {
    value: '',
    isVisible: true,
}

TextField.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    direction: PropTypes.oneOf(Object.values(direction)),
    type: PropTypes.string.isRequired,
    showError: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired
}
