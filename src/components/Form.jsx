import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { useForm } from "../index"
import { direction } from '../constants/helper'

const Form = ({ jsonConfig, className, layout, layoutDirection, initValues, formValues, submitButton, onSubmit, customComponents }) => {

    const parsedConfig = jsonConfig ? JSON.parse(jsonConfig) : {}

    const config = {
        ...parsedConfig,
        className,
        layout,
        layoutDirection,
        initValues,
    }

    const { values, errors, handleSubmit, getFormItem } = useForm(() => submit(), _.get(config, 'layout'), customComponents, formValues)

    const dir = config.layoutDirection === 'row' ? direction.row : direction.column

    const getValue = key =>
        // If no inputs are given, return default values or empty string
        _.get(values, key, _.get(config, ['initValues', key], ''))

    const submit = () => onSubmit(Object.values(errors).every(x => x === null) ? null : errors, values)

    return (
        <form className={`form ${config.className}`} onSubmit={handleSubmit} noValidate >
            {
                Object.keys(config.layout).map((key, i) => {
                    const formItem = getFormItem(key, config.layout[key], dir, getValue(key))

                    return (
                        <React.Fragment key={key}>
                            { formItem }
                        </React.Fragment>
                    )
                })
            }
            {submitButton}
        </form>
    )
}

export default Form

Form.defaultProps = {
    className: '',
    initValues: {},
    jsonConfig: '{}',
    customComponents: {},
}

Form.propTypes = {
    jsonConfig: PropTypes.string,
    className: PropTypes.string,
    layout: PropTypes.object,
    layoutDirection: PropTypes.string,
    initValues: PropTypes.object,
    formValues: PropTypes.object,
    submitButton: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    onSubmit: PropTypes.func,
    customComponents: PropTypes.object,
}
