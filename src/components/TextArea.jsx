import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { direction, uniqueId } from '../constants/helper'
import _ from 'lodash'

const TextArea = ({label, name, value = '', direction, placeholder, onChange, errorMessage, showError}) => {
    const [ id ] = useState(() => uniqueId(`${_.camelCase(label)}-`))
    const [ currentValue, setCurrentValue ] = useState(null)

    useEffect(() => {
        onChange(name, currentValue)
    }, [currentValue])

    const handleChange = e => setCurrentValue(e.target.value)

     return (
         <div className={`form-item form-item${direction}`}>

             {label !== '' && <label className={`form-item__label`} htmlFor={id}>{label}</label>}

             <div className="form-item__inner">
                <textarea className={`form-item__textarea ${showError ? 'error' : ''}`} placeholder={placeholder}
                          onChange={handleChange} name={name} htmlFor={id} value={value}>
                </textarea>
                 <span className={`error-label ${showError ? '' : 'hide'}`}>{errorMessage}</span>
             </div>

         </div>
     )
}

export default TextArea

TextArea.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    direction: PropTypes.oneOf(Object.values(direction)),
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string,
    showError: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
}
