import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { direction } from '../constants/helper'
import _ from 'lodash'

const TextArea = ({ id, name, value, placeholder, onChange, showError, isVisible }) => {
    const [currentValue, setCurrentValue] = useState('')

    useEffect(() => {
        onChange(name, currentValue, { isVisible })
    }, [currentValue, isVisible])

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
    isVisible: true,
    value: '',
}

TextArea.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    direction: PropTypes.oneOf(Object.values(direction)),
    placeholder: PropTypes.string,
    showError: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired
}
