import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types"
import { uniqueId, direction } from '../constants/helper'
import FormItem from './FormItem'
import _ from 'lodash'

const TextField = ({label, name, placeholder, value, direction, type, errorMessage, showError, onChange}) => {
    const [ id ] = useState(() => uniqueId(`${_.camelCase(label)}-`))
    const [currentValue, setCurrentValue] = useState('')

    useEffect(() => {
        onChange(name, currentValue)
    }, [currentValue])

    const handleChange = e => setCurrentValue(e.target.value)

    return (
        <FormItem label={label} id={id} direction={direction}>
            <input className={`form-item__input ${showError && 'error'}`} placeholder={placeholder} type={type}
                   onChange={handleChange} name={name} htmlFor={id} value={currentValue} defaultValue={value}/>
            <span className={`error-label ${showError ? '' : 'hide'}`}>{errorMessage}</span>
        </FormItem>
    )
}

export default TextField

TextField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    direction: PropTypes.oneOf(Object.values(direction)),
    type: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    showError: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
}
