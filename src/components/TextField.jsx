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

const formatMonetaryString = value => parseFloat(value)
    .toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const unformatString = (string, locale) => {
    var parts = (1234.5).toLocaleString(locale).match(/(\D+)/g);
    var unformatted = string;

    unformatted = unformatted.split(parts[0]).join("");
    unformatted = unformatted.split(parts[1]).join(".");

    return parseFloat(unformatted);
}

const getFormattedInput = (type, value) => {
    switch (type) {
        case 'euro':
            // If the value equals 0 or '', do nothing
            if (!value) {
                return value
            }

            // Check if the value ends with .99 or ,99 (assume those are cents)
            // const match = /^([0-9\.,]+)?[\.,]([0-9]+)$/.exec(value)
            //
            // if (match) {
            //     // Remove dots and comma's, add the cents and return
            //     return formatMonetaryString(`${_.replace(match[1] || '0', new RegExp('[\\.,]', 'g'), '')}.${match[2].substring(0, 2)}`)
            // }

            // Return the value with all dots and comma's removed
            return formatMonetaryString(value)//formatMonetaryString(_.replace(value, new RegExp('[\\.,]', 'g'), ''))
        default:
            return value
    }
}

const TextField = ({ id, name, placeholder, value, type, showError, onChange }) => {
    const [currentValue, setCurrentValue] = useState(value)
    const wrapperClass = getInputWrapperClass(type)

    useEffect(() => {
        onChange(name, currentValue)
    }, [currentValue])

    const handleChange = e => {
        setCurrentValue(e.target.value)
    }
    const inputMode = getInputMode(type)

    return (
        <div className={wrapperClass}>
            <input
                className={`form-item__input ${showError ? 'error' : ''}`}
                placeholder={placeholder}
                type={type}
                onChange={handleChange}
                name={name}
                htmlFor={id}
                value={currentValue}
                inputMode={inputMode}
                onBlur={() => setCurrentValue(getFormattedInput(type, unformatString(currentValue, 'de-DE')))}
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
