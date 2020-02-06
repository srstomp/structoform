import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { TextField, SelectField, DateField, Checkbox, TextArea, RadioButtonGroup, useForm } from "../index"
import { direction } from '../constants/helper'

const Form = ({ jsonConfig = '{}', className = '', layout, layoutDirection, initValues = [], submitButton, onSubmit }) => {

    const parsedConfig = jsonConfig ? JSON.parse(jsonConfig) : {}

    const config = {
        className,
        layout,
        layoutDirection,
        initValues,
        ...parsedConfig,
    }

    const validationRules = {...config.layout}

    Object.keys(validationRules).map((item, i) =>
        validationRules[item] = {type: validationRules[item].type, rules: validationRules[item].validators}
    )

    const { values, errors, handleSubmit, handleChange } = useForm(() => submit(), validationRules)

    const dir = config.layoutDirection === 'row' ? direction.row : direction.column

    const getValue = (key) => {
        // If no inputes are given, then return default valutes or empty string
        if (!values[key]) {
            return config.initValues[key] || ''
        }
        return values[key]
    }

    const submit = () => {
        onSubmit(Object.values(errors).every(x => x === null) ? null : errors, values)
    }

    const getItem = (key, value, index) => {
        switch(value.type) {
            case 'text':
            case 'password':
            case 'email':
            case 'phone':
            case 'number':
                return <TextField key={index} type={value.type} name={key} label={value.label} direction={dir}
                                  placeholder={value.placeholder || ''} value={values[key]} onChange={handleChange}
                                  showError={!_.isEmpty(errors[key])} errorMessage={_.head(errors[key]) || ''}/>
            case 'select':
                return <SelectField key={key} label={value.label} values={value.values || []} direction={dir}
                                    name={key} placeholder={value.placeholder || ''} onChange={handleChange}
                                    showError={!_.isEmpty(errors[key])} errorMessage={_.head(errors[key]) || ''}/>
            case 'checkbox':
                return <Checkbox key={key} label={value.label} name={key} value={getValue(key) || false}
                                 onChange={handleChange} showError={!_.isEmpty(errors[key])}
                                 errorMessage={_.head(errors[key]) || ''}/>
            case 'textarea':
                return <TextArea key={key} label={value.label} name={key} direction={dir} onChange={handleChange}
                                 showError={!_.isEmpty(errors[key])} placeholder={value.placeholder}
                                 errorMessage={_.head(errors[key]) || ''} value={values[key]}/>
            case 'date':
                return <DateField key={index} name={key} label={value.label} direction={dir} onChange={handleChange}
                                  placeholder={value.placeholder || ''} value={values[key]}
                                  showError={!_.isEmpty(errors[key])} errorMessage={_.head(errors[key]) || ''}/>
            case 'radio':
                return <RadioButtonGroup key={index} label={value.label} inline={value.inline} items={value.values}
                                         name={key} showError={!_.isEmpty(errors[key])} onChange={handleChange}
                                         errorMessage={_.head(errors[key]) || ''}/>
            default:
                throw new Error(`Unhandled form type: ${value.type}`)
        }
    }

    return (
        <form className={`form ${config.className}`} onSubmit={handleSubmit} noValidate >
            {
                Object.keys(config.layout).map((key, i) => {
                    return getItem(key, config.layout[key], i)
                })
            }
            { submitButton }
        </form>
    )
}

export default Form

Form.propTypes = {
    jsonConfig: PropTypes.string,
    className: PropTypes.string,
    layout: PropTypes.object,
    layoutDirection: PropTypes.string,
    initValues: PropTypes.array,
    submitButton: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    onSubmit: PropTypes.func
}
