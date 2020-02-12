import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { uniqueId, direction } from '../constants/helper'
import FormItem from './FormItem'

const SelectField = ({label, name, placeholder, values, direction, disabled = false, errorMessage, showError, onChange, isVisible}) => {
    const [ id ] = useState(() => uniqueId(`${_.camelCase(label)}-`))
    const [ currentValue, setCurrentValue ] = useState(placeholder)
    const [ isChecked, setIsChecked ] = useState(false)

    useEffect(() => {
        onChange(name, isChecked ? currentValue : null, { isVisible })
    }, [currentValue, isVisible])

    const placeholderStyling = () => `${currentValue === placeholder && 'form-item__select--placeholder'}`

    const handleChange = (e => {
        setIsChecked(true)
        setCurrentValue(e.target.value)
    })

    return isVisible && (
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
    direction: PropTypes.oneOf(Object.values(direction)),
    disabled: PropTypes.bool,
    errorMessage: PropTypes.string,
    showError: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired
}
