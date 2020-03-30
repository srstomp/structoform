import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { direction } from '../constants/helper'

const SelectField = ({ id, name, placeholder, values, value, disabled, showError, onChange, isVisible }) => {
    const [currentValue, setCurrentValue] = useState(value)

    useEffect(() => {
        onChange(name, currentValue, { isVisible })
    }, [currentValue, isVisible])

    const placeholderStyling = () => `${currentValue === placeholder && 'form-item__select--placeholder'}`

    const handleChange = (e => {
        setCurrentValue(e.target.value)
    })

    return (
        <select
            className={`form-item__select ${placeholderStyling()} ${showError ? 'error' : ''}`}
            htmlFor={id} name={name} onChange={handleChange} value={currentValue}
            disabled={disabled}
        >
            <option disabled default>{placeholder}</option>
            {
                values.map((item, i) => {
                    return <option key={i} value={item.value}>{item.option}</option>
                })
            }
        </select>
    )
}

export default SelectField

SelectField.defaultProps = {
    isVisible: true
}

SelectField.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.shape).isRequired,
    value: PropTypes.string,
    direction: PropTypes.oneOf(Object.values(direction)),
    disabled: PropTypes.bool,
    showError: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired
}
