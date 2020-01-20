import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { uniqueId } from '../constants/helper'

const RadioButton = ({label, value, group}) => {
    const [ id ] = useState(() => uniqueId(`${_.camelCase(radio)}-`))
    const handleChange = (e) => console.log(e.target.checked)

    return (
        <div className={`form-item form-item${direction}`}>
            <input type='radio' value={value} name={group} onChange={handleChange} id={id}
                   className='form-item__radio'/>
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

export default RadioButton

RadioButton.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.object,
    group: PropTypes.string
}
