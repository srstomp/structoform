import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { uniqueId, direction } from '../constants/helper'
import FormItem from "./FormItem";

const SelectField = ({label, name, placeholder, values, direction, onChange, errorMessage, showError}) => {

    const [selectedValue, setSelectedValue] = useState(placeholder)
    const [ id ] = useState(() => uniqueId(`${_.camelCase(label)}-`))

    // const className = () => {
    //     return (
    //         `form-item__select form-item__select--placeholder ${errorMessage !== '' ? 'error' : ''}`
    //     )
    // }

    const placeholderStyling = () => `${selectedValue === placeholder && 'form-item__select--placeholder'}`

    const didChangeSelection = (e => {
        setSelectedValue(e.target.value)
        onChange(e)
    })

    return (
        <FormItem label={label} id={id} direction={direction}>

            <div className="form-item__inner">
                <select className={`form-item__select ${placeholderStyling()} ${errorMessage !== '' ? 'error' : ''}`} htmlFor={id} name={name}
                        onChange={didChangeSelection} value={selectedValue}>
                    <option disabled default>{placeholder}</option>
                    {
                        values.map((item, i) => <option key={i} value={item}>{item}</option>)
                    }
                </select>
                <span className={`form-item__error-label ${showError ? '' : 'hide'}`}>{errorMessage}</span>
            </div>
        </FormItem>
    )
}

export default SelectField

SelectField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
    direction: PropTypes.oneOf(Object.values(direction)),
    onChange: PropTypes.func,
    errorMessage: PropTypes.string,
    showError: PropTypes.bool.isRequired,
}
