import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { TextField, SelectField, Checkbox, useForm } from "../index"
import TextArea from "./TextArea"
import { direction } from '../constants/helper'

const Form = ({ className = '', layout, layoutDirection, initValues = [], submitButton, onSubmit }) => {

    const validationRules = {...layout}

    Object.keys(validationRules).map((item, i) =>
        validationRules[item] = {type: validationRules[item].type, rules: validationRules[item].validators}
    )

    const { values, errors, handleSubmit, handleChange } = useForm(() => submit(), validationRules)

    const dir = layoutDirection === 'row' ? direction.row : direction.column

    const getValue = (key) => {
        // If no inputes are given, then return default valutes or empty string
        if (!values[key]) {
            return initValues[key] || ''
        }
        return values[key]
    }

    const submit = () => {
        console.log('errors:', errors)
        console.log('values:', values)
        onSubmit(errors, values)
    }

    const getItem = (key, value, index) => {
        switch(value.type) {
            case 'text':
            case 'password':
            case 'email':
            case 'phone':
            case 'number':
                return <TextField key={index} type={value.type} name={key} label={value.label} direction={dir}
                                  placeholder={value.placeholder || ''} value={values[key]}
                                  showError={!_.isEmpty(errors[key])}  errorMessage={_.head(errors[key]) || ''}/>
            case 'select':
                return <SelectField key={key} label={value.label} values={value.values || []} direction={dir}
                                    name={key} placeholder={value.placeholder || ''}
                                    showError={!_.isEmpty(errors[key])} errorMessage={_.head(errors[key]) || ''}/>
            case 'checkbox':
                return <Checkbox key={key} label={value.label} name={key} value={getValue(key)}
                                 showError={!_.isEmpty(errors[key])} onChange={handleChange}
                                 errorMessage={_.head(errors[key]) || ''}/>
            case 'textarea':
                return <TextArea key={key} label={value.label} name={key} direction={dir} onChange={handleChange}
                                 showError={!_.isEmpty(errors[key])} placeholder={value.placeholder}
                                 errorMessage={_.head(errors[key]) || ''} value={values[key]}/>
            case 'date':
                return <span>date</span>
            case 'radio':
                return <span>radio</span>
            default:
                throw new Error(`Unhandled form type: ${value.type}`)
        }
    }

    return (
        <form className={`form ${className}`} onSubmit={handleSubmit} onChange={handleChange} noValidate >
            {
                Object.keys(layout).map((key, i) => {
                    return getItem(key, layout[key], i)
                })
            }
            { submitButton }
        </form>
    )
}

export default Form

Form.propTypes = {
    className: PropTypes.string,
    layout: PropTypes.object.isRequired,
    layoutDirection: PropTypes.string,
    initValues: PropTypes.array,
}
