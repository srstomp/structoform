import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const SelectField = ({ id, name, placeholder, values, value, disabled, showError, onChange }) => {
    const [currentValue, setCurrentValue] = useState(value || "")

    useEffect(() => {
        onChange(name, currentValue)
    }, [currentValue])

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
            <option disabled value="">{placeholder}</option>
            {
                values.map((item, i) => {
                    return <option key={i} value={item.value}>{item.option}</option>
                })
            }
        </select>
    )
}

export default SelectField

SelectField.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.shape).isRequired,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    showError: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
}
