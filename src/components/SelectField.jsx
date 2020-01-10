import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { uniqueId, direction } from '../constants/helper'
import FormItem from "./FormItem";

const SelectField = ({label, name, placeholder, values, direction, errorMessage, showError}) => {
    const [ id ] = useState(() => uniqueId(`${_.camelCase(label)}-`))
    const [ selectedValue, setSelectedValue ] = useState(placeholder)

    const placeholderStyling = () => `${selectedValue === placeholder && 'form-item__select--placeholder'}`

    const didChangeSelection = (e => {
        setSelectedValue(e.target.value)
    })

    return (
        <FormItem label={label} id={id} direction={direction}>
            <select className={`form-item__select ${placeholderStyling()} ${errorMessage !== '' ? 'error' : ''}`}
                    htmlFor={id} name={name} onChange={didChangeSelection} value={selectedValue}>
                <option disabled default>{placeholder}</option>
                {
                    values.map((item, i) => {
                        return <option key={i} value={item.value}>{item.option}</option>
                    })
                }
            </select>
            <span className={`error-label ${showError ? '' : 'hide'}`}>{errorMessage}</span>
        </FormItem>
    )
}

export default SelectField

SelectField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.shape).isRequired,
    direction: PropTypes.oneOf(Object.values(direction)),
    errorMessage: PropTypes.string,
    showError: PropTypes.bool.isRequired,
}
