import React from 'react'
import PropTypes from 'prop-types'

const FormItem = ({label, id, direction, children}) =>
    <div className={`form-item form-item${direction}`}>
        {label !== '' && <label className={`form-item__label`} htmlFor={id}>{label}</label>}
        {children}
    </div>

export default FormItem
