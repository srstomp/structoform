import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash';

const Checkbox = ({ id, name, value, onChange, showError }) => {
    const [isChecked, setIsChecked] = useState(value)

    const handleChange = e => setIsChecked(e.target.checked)

    useEffect(() => {
        onChange(name, isChecked)
    }, [isChecked])

    return (
        <div className={`form-item`}>
            <input
                className={`form-item__checkbox ${showError && 'error'}`}
                type='checkbox'
                name={name}
                onChange={handleChange}
                checked={isChecked}
                id={id}
            />
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
