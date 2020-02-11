import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {direction as directions, uniqueId} from '../constants/helper'
import RadioButton from './RadioButton'
import FormItem from './FormItem'
import _ from "lodash";

const RadioButtonGroup = ({items, name, label, direction, inline, errorMessage, showError, onChange}) => {
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
        <FormItem label={label} id={id} direction={direction}>
            <div className={`form-item__radiogroup${inline ? directions.row : directions.column}`}>
                {
                    items.map(item => <RadioButton key={uniqueId(`${_.camelCase(item.label)}-`)} label={item.label}
                                                   value={item.value} group={name} onChange={handleChange}
                                                   isChecked={item.value === currentValue}/>)
                }
            </div>
            <span className={`error-label ${showError ? '' : 'hide'}`}>{errorMessage}</span>
        </FormItem>
    )
}

export default RadioButtonGroup

RadioButtonGroup.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape).isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(Object.values(directions)),
    inline: PropTypes.bool,
    errorMessage: PropTypes.string,
    showError: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
}
