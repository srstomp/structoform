import React, {useState} from 'react'
import PropTypes from "prop-types"
import { uniqueId, direction } from '../constants/helper'
import FormItem from "./FormItem";
import Calendar from "./calendar/Calendar";

const DateField = ({label, name, placeholder, value, direction, errorMessage, showError}) => {
    const [ id ] = useState(() => uniqueId(`${_.camelCase(label)}-`))
    const [currentValue, setCurrentValue] = useState('')

    const handleChange = (e => {
        setCurrentValue(e.target.value)
    })

    return (
        <FormItem label={label} id={id} direction={direction}>
            <input className={`form-item__input ${showError && 'error'}`} placeholder={placeholder} type='date'
                   onChange={handleChange} name={name} htmlFor={id} value={currentValue} defaultValue={value}/>
            <span className={`error-label ${showError ? '' : 'hide'}`}>{errorMessage}</span>
            <Calendar/>
        </FormItem>
    )
}

export default DateField

DateField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    direction: PropTypes.oneOf(Object.values(direction)),
    errorMessage: PropTypes.string,
    showError: PropTypes.bool.isRequired,
}
