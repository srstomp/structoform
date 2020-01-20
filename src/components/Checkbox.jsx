import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { uniqueId } from '../constants/helper'
import _ from "lodash";

const Checkbox = ({label, name, value, showError}) => {
    const [ id ] = useState(() => uniqueId(`${_.camelCase(label)}-`))
    const [ isChecked, setIsChecked ] = useState(false)

    const handleChange = (e) => {
        setIsChecked(e.target.checked)
    }

    return (
        <div className={`form-item`}>
            <input className={`form-item__checkbox`} type='checkbox' name={name} onChange={handleChange} checked={isChecked}
                   id={id}/>
            <label className={`${showError ? 'error-label' : ''}`} htmlFor={id}>{label}</label>
            {/*<span className={`error-label ${showError ? '' : 'hide'}`}>{errorMessage}</span>*/}
        </div>
    )
}

export default Checkbox

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.bool,
    showError: PropTypes.bool,
    errorMessage: PropTypes.string
}
