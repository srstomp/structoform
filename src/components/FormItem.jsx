import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { direction } from '../constants/helper'

const FormItem = ({label, subLabel, id, direction, children}) =>
    <div className={`form-item form-item${direction}`}>
        <div className="form-item__label-wrapper">
            {!!label && <label className={`form-item__label`} htmlFor={id}>{label}</label>}
            {!!subLabel && <span className={`form-item__sublabel`}>{subLabel}</span>}
        </div>

        <div className="form-item__inner">
            {children}
        </div>
    </div>

export default FormItem

FormItem.propTypes = {
    label: PropTypes.string,
    subLabel: PropTypes.string,
    id: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(Object.values(direction)),
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}
