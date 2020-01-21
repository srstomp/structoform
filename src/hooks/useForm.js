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
                    console.log(key, validator)
                    console.log(values[key], validators[validator])
                    setErrors(errors => ( { ...errors, [key]: validate(values[key], validators[validator])} ))
                }
            })
        })

        setIsSubmitting(true)
    }

//[\d/]
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

    let errors = validators.rules.map(rule => {
        switch (rule) {
            case validate.types.REQUIRED:
                return !value && copy.nl.error_is_required
            case validate.types.EMAIL:
                return !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value) && copy.nl.error_invalid_email
            case validate.types.IS_SELECTED:
                return !value && copy.nl.error_is_selected
            case validate.types.IS_CHECKED:
                return !value && copy.nl.error_is_checked
            case validate.types.IS_NUMBER:
                return !/^(?=.*[0-9])/.test(value) && copy.nl.error_not_numeric
            case validate.types.IS_PASSWORD:
                return !value && copy.nl.error_is_password
            default:
                throw new Error(`Unhandled validator rule: ${rule}`)
        }
    }).filter(item => typeof(item) === 'string')

    return _.isEmpty(errors) ? null : errors
}

validate.types = {
    REQUIRED: 'isRequired',
    EMAIL: 'isEmail',
    IS_SELECTED: 'isSelected',
    IS_CHECKED: 'isChecked',
    IS_NUMBER: 'isNumber',
    IS_PASSWORD: 'isPassword',
}
