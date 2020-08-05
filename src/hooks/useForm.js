import React, { useState, useEffect } from 'react'
import { uniqueId, copy, comparators } from '../constants/helper';
import _ from "lodash";
import { TextField, SelectField, DateField, Checkbox, TextArea, RadioButtonGroup, DisplayText, FormItem } from '..';
// import CustomField from '../components/CustomField';

const useForm = (callback, layout, customComponents, _values = {}) => {
    const [values, setValues] = useState(_values)
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    // TODO: Make a CustomComponent wrapper that manages the state of the custom components
    // const wrappedCustomComponents = Object
    //     .keys(customComponents)
    //     .reduce((acc, key) => {
    //         acc[key] = (props) => <CustomField {...props} component={customComponents[key]} />

    //         return acc
    //     }, {})

    const formComponents = {
        ...customComponents,
        'text': TextField,
        'password': TextField,
        'email': TextField,
        'phone': TextField,
        'number': TextField,
        'percentage': TextField,
        'euro': TextField,
        'select': SelectField,
        'checkbox': Checkbox,
        'textarea': TextArea,
        'date': DateField,
        'radio': RadioButtonGroup,
        'displaytext': DisplayText,
    }

    useEffect(() => {
        if (_.size(_.omit(_values, _.identity)) > 0) {
            setValues(_values)
        }
    }, [_values])

    useEffect(() => {
        if (isSubmitting) {
            callback()
        }

        setIsSubmitting(false)
        // eslint-disable-next-line
    }, [isSubmitting, errors])

    const handleSubmit = (event) => {
        // Access the event properties. https://reactjs.org/docs/events.html
        event.persist()

        if (event) {
            event.preventDefault()
        }

        // Reset errors
        // setErrors({})

        Object.keys(layout).forEach(itemKey => {
            const value = _.get(values, itemKey)

            if (checkConditionals(_.get(layout, [itemKey, 'conditionals'], []))) {
                setErrors(errors => ({ ...errors, [itemKey]: validate(value, _.get(layout, [itemKey, 'validators'], [])) }))
            }
        })

        setIsSubmitting(true)
    }

    const handleChange = (key, value) => {
        // Remove current error on typing
        setErrors(errors => ({ ...errors, [key]: null }))

        // Store values of input elements
        setValues(values => ({ ...values, [key]: value }))
    }

    const getFormItemComponent = (type) => _.get(formComponents, type)

    const getFormItem = (key, itemLayout, direction, value) => {
        const [id] = useState(() => uniqueId(`${_.camelCase(_.get(itemLayout, 'label'))}-`))
        const FormComponent = getFormItemComponent(_.get(itemLayout, 'type'))
        const isVisible = checkConditionals(_.get(itemLayout, 'conditionals', []))
        const showError = !_.isEmpty(errors[key])
        const hint = _.get(itemLayout, 'hint')

        if (FormComponent) {
            return isVisible && (
                <FormItem label={_.get(itemLayout, 'label')} id={id} direction={direction}>
                    <FormComponent
                        {...itemLayout}
                        id={id}
                        name={key}
                        value={value}
                        onChange={handleChange}
                        isVisible={isVisible}
                        showError={showError}
                    />
                    {hint && <span className="hint-label">{hint}</span>}
                    <span className={`error-label ${showError ? '' : 'hide'}`}>{_.head(errors[key]) || ''}</span>
                </FormItem>
            )
        }

        throw new Error(`Unhandled validator rule: ${_.get(itemLayout, 'type')}`)
    }

    // Returns true if all the conditions are met
    const checkConditionals = conditionals => conditionals.every(conditional => {
        if (typeof conditional === "boolean") {
            return conditional
        }

        const rule = _.isPlainObject(conditional) ? conditional : { field: conditional, condition: comparators.TRUTHY }

        const field = _.get(rule, 'field', '')
        const value = _.get(rule, 'value')

        switch (_.get(rule, 'condition', comparators.IS)) {
            case comparators.IS:
                return values[field] === value
            case comparators.ISNOT:
                return values[field] !== value
            case comparators.MORE:
                return Number(values[field]) > Number(value)
            case comparators.LESS:
                return Number(values[field] < Number(value))
            case comparators.TRUTHY:
            default:
                return !!values[field]
        }
    })

    return {
        values,
        errors,
        handleSubmit,
        handleChange,
        getFormItem,
        checkConditionals
    }
}

export default useForm

const validate = (value, validators) => {
    let errors = validators.map(validator => {
        const rule = _.isPlainObject(validator) ? validator : { type: validator }
        const getErrorMessage = (fallback) => _.get(rule, 'errorMessage') || fallback

        switch (_.get(rule, 'type')) {
            case validate.types.REQUIRED:
                return !value && getErrorMessage(copy.nl.error_is_required)
            case validate.types.EMAIL:
                return !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value) && getErrorMessage(copy.nl.error_invalid_email)
            case validate.types.REGEX:
                return !new RegExp(_.get(rule, 'parameter')).test(value) && getErrorMessage(copy.nl.error_generic)
            case validate.types.FUNCTION:
                return !_.get(rule, 'parameter')(value) && getErrorMessage(copy.nl.error_generic)
            case validate.types.IS_SELECTED:
                return !value && getErrorMessage(copy.nl.error_is_selected)
            case validate.types.IS_CHECKED:
                return !value && getErrorMessage(copy.nl.error_is_checked)
            case validate.types.IS_NUMBER:
                return !/^(?=.*[0-9])/.test(value) && getErrorMessage(copy.nl.error_not_numeric)
            case validate.types.IS_PASSWORD:
                return !value && getErrorMessage(copy.nl.error_is_password)
            default:
                throw new Error(`Unhandled validator rule: ${_.get(rule, 'type')}`)
        }
    }).filter(item => typeof (item) === 'string')

    return _.isEmpty(errors) ? null : errors
}

validate.types = {
    REQUIRED: 'isRequired',
    EMAIL: 'isEmail',
    REGEX: 'checkRegex',
    FUNCTION: 'checkFunction',
    IS_SELECTED: 'isSelected',
    IS_CHECKED: 'isChecked',
    IS_NUMBER: 'isNumber',
    IS_PASSWORD: 'isPassword',
}
