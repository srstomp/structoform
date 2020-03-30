import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { direction } from '../constants/helper'
import _ from 'lodash'

const TextArea = ({ id, name, value, placeholder, onChange, showError }) => {
    const [currentValue, setCurrentValue] = useState('')

    useEffect(() => {
        onChange(name, currentValue)
    }, [currentValue])

    const handleChange = e => setCurrentValue(e.target.value)

    return (
        <div className="form-item__inner">
            <textarea className={`form-item__textarea ${showError ? 'error' : ''}`} placeholder={placeholder}
                onChange={handleChange} name={name} htmlFor={id} value={value}>
            </textarea>
        </div>
    )
}

export default TextArea

TextArea.defaultProps = {
    value: '',
}

TextArea.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    direction: PropTypes.oneOf(Object.values(direction)),
    placeholder: PropTypes.string,
    showError: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
}
