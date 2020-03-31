import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash';

const Checkbox = ({ id, name, value, inlineLabel, onChange, showError }) => {
    console.log("checkbox", value)
    const [isChecked, setIsChecked] = useState(!!value)

    const handleChange = e => setIsChecked(e.target.checked)

    useEffect(() => {
        onChange(name, isChecked)
    }, [isChecked])

    return (
        <div className={`form-item--row`}>
            <input
                className={`form-item__checkbox ${showError && 'error'}`}
                type='checkbox'
                name={name}
                onChange={handleChange}
                checked={isChecked}
                id={id}
            />
            <label className="form-item__checkbox--inline-label" htmlFor={id}>{inlineLabel}</label>
        </div>
    )
}

export default Checkbox

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    showError: PropTypes.bool
}
