import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { uniqueId } from '../constants/helper'

const RadioButton = ({label, value, group, onChange, isChecked, renderTabs, spaceBetween}) => {
    const [ id ] = useState(() => uniqueId(`${_.camelCase(label)}-`))

    const handleChange = (e) => {
        onChange(e)
    }

    return (
        <div className={`radio-wrapper ${spaceBetween && 'radio-wrapper--space-between'}`}>
            <input type='radio' value={value} name={group} onChange={handleChange} id={id} checked={isChecked}
                   className={`form-item__radio ${renderTabs && 'form-item__radio--tabs'}`}/>
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

export default RadioButton

RadioButton.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    isChecked: PropTypes.bool,
    renderTabs: PropTypes.bool,
    spaceBetween: PropTypes.bool,
}
