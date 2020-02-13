import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { uniqueId, direction } from '../constants/helper'
import FormItem from './FormItem'

const SelectField = ({label, name, placeholder, values, value, direction, disabled = false, errorMessage, showError, onChange}) => {
    const [ id ] = useState(() => uniqueId(`${_.camelCase(label)}-`))
    const [ currentValue, setCurrentValue ] = useState(value)

    useEffect(() => {
        onChange(name, currentValue)
    }, [currentValue])

    const placeholderStyling = () => `${currentValue === placeholder && 'form-item__select--placeholder'}`

    const handleChange = (e => {
        setCurrentValue(e.target.value)
    })

    return (
        <FormItem label={label} id={id} direction={direction}>
            <select className={`form-item__select ${placeholderStyling()} ${showError ? 'error' : ''}`}
                    htmlFor={id} name={name} onChange={handleChange} value={currentValue} 
                    disabled={disabled}>
                <option disabled default>{placeholder}</option>
                {
                    values.map((item, i) => {
                        return <option key={i} value={item.value}>{item.option}</option>
                    })
                }
            </select>
            <span className={`error-label ${showError ? '' : 'hide'}`}>{errorMessage}</span>
        </FormItem>
    )
}

export default SelectField

SelectField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.shape).isRequired,
    value: PropTypes.string,
    direction: PropTypes.oneOf(Object.values(direction)),
    disabled: PropTypes.bool,
    errorMessage: PropTypes.string,
    showError: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
}
