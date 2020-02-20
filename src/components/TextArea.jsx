import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { direction, uniqueId } from '../constants/helper'
import FormItem from './FormItem'
import _ from 'lodash'

const TextArea = ({label, name, value = '', direction, placeholder, onChange, errorMessage, showError, isVisible}) => {
    const [ id ] = useState(() => uniqueId(`${_.camelCase(label)}-`))
    const [ currentValue, setCurrentValue ] = useState('')

    useEffect(() => {
        onChange(name, currentValue, { isVisible })
    }, [currentValue, isVisible])

    const handleChange = e => setCurrentValue(e.target.value)

     return isVisible && (
        <FormItem label={label} id={id} direction={direction}>
             <div className="form-item__inner">
                <textarea className={`form-item__textarea ${showError ? 'error' : ''}`} placeholder={placeholder}
                          onChange={handleChange} name={name} htmlFor={id} value={value}>
                </textarea>
                 <span className={`error-label ${showError ? '' : 'hide'}`}>{errorMessage}</span>
             </div>
         </FormItem>
     )
}

export default TextArea

TextArea.defaultProps = {
    isVisible: true,
}

TextArea.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    direction: PropTypes.oneOf(Object.values(direction)),
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string,
    showError: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired
}
