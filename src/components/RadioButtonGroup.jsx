import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {direction, uniqueId} from '../constants/helper'
import RadioButton from './RadioButton'
import _ from "lodash";

const RadioButtonGroup = ({items, name, label, inline, errorMessage, showError, onChange}) => {
    const [ id ] = useState(() => uniqueId(`${_.camelCase(label)}-`))
    const [ currentValue, setCurrentValue] = useState('')

    useEffect(() => {
        onChange(name, currentValue)
    }, [currentValue])

    const handleChange = (e) => {
        e.preventDefault()
        setCurrentValue(e.target.value)
    }

    return (
        <div className={`form-item`}>
            {label !== '' && <label className={`form-item__label`} htmlFor={id}>{label}</label>}
            <div className={`form-item__radiogroup${inline ? direction.row : direction.column}`}>
                {
                    items.map(item => <RadioButton key={uniqueId(`${_.camelCase(item.label)}-`)} label={item.label}
                                                   value={item.value} group={name} onChange={handleChange}
                                                   isChecked={item.value === currentValue}/>)
                }
            </div>
            <span className={`error-label ${showError ? '' : 'hide'}`}>{errorMessage}</span>
        </div>
    )
}

export default RadioButtonGroup

RadioButtonGroup.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape).isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    inline: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    showError: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
}
