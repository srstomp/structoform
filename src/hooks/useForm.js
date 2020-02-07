import {useState, useEffect} from 'react'
import { copy } from '../constants/helper';

const useForm = (callback, validators) => {
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

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

        Object.keys(validators).forEach( validator => {
            Object.keys(values).forEach((key) => {
                if ( key === validator ) {
                    setErrors(errors => ( { ...errors, [key]: validate(values[key], validators[validator])} ))
                }
            })
        })

        setIsSubmitting(true)
    }

    const handleChange = (key, value) => {
        // Remove current error on typing
        setErrors(errors => ({ ...errors, [key]: null}))

        // Store values of input elements
        setValues(values => ({ ...values, [key]: value}))
    }

    return {
        values,
        errors,
        handleSubmit,
        handleChange
    }
}

export default useForm

const validate = (value, validators) => {
    let errors = validators.rules.map(validator => {
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
    }).filter(item => typeof(item) === 'string')

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
